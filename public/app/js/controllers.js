'use strict';

angular.module('xenon.controllers', []).
controller('LoginLightCtrl', function($scope, $rootScope) {
    $rootScope.isLoginPage = true;
    $rootScope.isLightLoginPage = true;
    $rootScope.isLockscreenPage = false;
    $rootScope.isMainPage = false;
}).
controller('LockscreenCtrl', function($scope, $rootScope) {
    $rootScope.isLoginPage = false;
    $rootScope.isLightLoginPage = false;
    $rootScope.isLockscreenPage = true;
    $rootScope.isMainPage = false;
}).
controller('MainCtrl', function($scope, $rootScope, $location, $layout, $layoutToggles, $pageLoadingBar, Fullscreen) {
    $rootScope.isLoginPage = false;
    $rootScope.isLightLoginPage = false;
    $rootScope.isLockscreenPage = false;
    $rootScope.isMainPage = true;

    $rootScope.layoutOptions = {
        horizontalMenu: {
            isVisible: true,
            isFixed: true,
            minimal: false,
            clickToExpand: false,

            isMenuOpenMobile: false
        },
        sidebar: {
            isVisible: false,
            isCollapsed: false,
            toggleOthers: true,
            isFixed: true,
            isRight: false,

            isMenuOpenMobile: false,

            // Added in v1.3
            userProfile: true
        },
        chat: {
            isOpen: false,
        },
        settingsPane: {
            isOpen: false,
            useAnimation: true
        },
        container: {
            isBoxed: false
        },
        skins: {
            sidebarMenu: '',
            horizontalMenu: '',
            userInfoNavbar: ''
        },
        pageTitles: true,
        userInfoNavVisible: false
    };

    $layout.loadOptionsFromCookies(); // remove this line if you don't want to support cookies that remember layout changes


    $scope.updatePsScrollbars = function() {
        var $scrollbars = jQuery(".ps-scrollbar:visible");

        $scrollbars.each(function(i, el) {
            if (typeof jQuery(el).data('perfectScrollbar') == 'undefined') {
                jQuery(el).perfectScrollbar();
            } else {
                jQuery(el).perfectScrollbar('update');
            }
        })
    };


    // Define Public Vars
    public_vars.$body = jQuery("body");


    // Init Layout Toggles
    $layoutToggles.initToggles();


    // Other methods
    $scope.setFocusOnSearchField = function() {
        public_vars.$body.find('.search-form input[name="s"]').focus();

        setTimeout(function() {
            public_vars.$body.find('.search-form input[name="s"]').focus()
        }, 100);
    };


    // Watch changes to replace checkboxes
    $scope.$watch(function() {
        cbr_replace();
    });

    // Watch sidebar status to remove the psScrollbar
    $rootScope.$watch('layoutOptions.sidebar.isCollapsed', function(newValue, oldValue) {
        if (newValue != oldValue) {
            if (newValue == true) {
                public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('destroy')
            } else {
                // public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar({
                //     wheelPropagation: public_vars.wheelPropagation
                // });
            }
        }
    });


    // Page Loading Progress (remove/comment this line to disable it)
    $pageLoadingBar.init();

    $scope.showLoadingBar = showLoadingBar;
    $scope.hideLoadingBar = hideLoadingBar;


    // Set Scroll to 0 When page is changed
    $rootScope.$on('$stateChangeStart', function() {
        var obj = {
            pos: jQuery(window).scrollTop()
        };

        TweenLite.to(obj, .25, {
            pos: 0,
            ease: Power4.easeOut,
            onUpdate: function() {
                $(window).scrollTop(obj.pos);
            }
        });
    });


    // Full screen feature added in v1.3
    $scope.isFullscreenSupported = Fullscreen.isSupported();
    $scope.isFullscreen = Fullscreen.isEnabled() ? true : false;

    $scope.goFullscreen = function() {
        if (Fullscreen.isEnabled())
            Fullscreen.cancel();
        else
            Fullscreen.all();

        $scope.isFullscreen = Fullscreen.isEnabled() ? true : false;
    }

}).
controller('SidebarMenuCtrl', function($scope, $rootScope, $menuItems, $timeout, $location, $state, $layout) {

    // Menu Items
    var $sidebarMenuItems = $menuItems.instantiate();

    $scope.menuItems = $sidebarMenuItems.prepareSidebarMenu().getAll();

    // Set Active Menu Item
    $sidebarMenuItems.setActive($location.path());

    $rootScope.$on('$stateChangeSuccess', function() {
        $sidebarMenuItems.setActive($state.current.name);
    });

    // Trigger menu setup
    public_vars.$sidebarMenu = public_vars.$body.find('.sidebar-menu');
    $timeout(setup_sidebar_menu, 1);

    ps_init(); // perfect scrollbar for sidebar
}).
controller('HorizontalMenuCtrl', function($scope, $rootScope, $menuItems, $timeout, $location, $state) {
    var $horizontalMenuItems = $menuItems.instantiate();

    $scope.menuItems = $horizontalMenuItems.prepareHorizontalMenu().getAll();

    // Set Active Menu Item
    $horizontalMenuItems.setActive($location.path());

    $rootScope.$on('$stateChangeSuccess', function() {
        $horizontalMenuItems.setActive($state.current.name);

        $(".navbar.horizontal-menu .navbar-nav .hover").removeClass('hover'); // Close Submenus when item is selected
    });

    // Trigger menu setup
    $timeout(setup_horizontal_menu, 1);
}).
controller('SettingsPaneCtrl', function($rootScope) {
    // Define Settings Pane Public Variable
    public_vars.$settingsPane = public_vars.$body.find('.settings-pane');
    public_vars.$settingsPaneIn = public_vars.$settingsPane.find('.settings-pane-inner');
}).
controller('ChatCtrl', function($scope, $element) {
    var $chat = jQuery($element),
        $chat_conv = $chat.find('.chat-conversation');

    $chat.find('.chat-inner').perfectScrollbar(); // perfect scrollbar for chat container


    // Chat Conversation Window (sample)
    $chat.on('click', '.chat-group a', function(ev) {
        ev.preventDefault();

        $chat_conv.toggleClass('is-open');

        if ($chat_conv.is(':visible')) {
            $chat.find('.chat-inner').perfectScrollbar('update');
            $chat_conv.find('textarea').autosize();
        }
    });

    $chat_conv.on('click', '.conversation-close', function(ev) {
        ev.preventDefault();

        $chat_conv.removeClass('is-open');
    });
}).
controller('loginCtrl', function($scope, $rootScope, $state,$location,$cookies, $http) {
    var isLoggedIn = $cookies['isLoggedIn'];
     if (isLoggedIn) {
         $state.go("app.mydashboard");
     }
    $rootScope.layoutOptions = {
        horizontalMenu: {
            isVisible: false
        }
    };
    $scope.doLogin = function() {
        if ($scope.username != '' && $scope.password != '') {
            $http({
                method: 'POST',
                url: '/login',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'username=' + $scope.username + '&password=' + $scope.password,
            }).then(function(response) {
                $cookies['isLoggedIn']= response.data.isLoggedIn;
                $scope.showMsg = {
                    status: 'sucess',
                    message: 'Successful to login'
                };
                $state.go("app.mydashboard");
                $rootScope.currentUser = response.data;
            }, function(response) {
                $scope.showMsg = {
                    status: 'error',
                    message: 'Username or Password is Invalid.'
                };
                console.log($scope.showMsg);
            });
        } else {
            $scope.showMsg = {
                status: 'error',
                message: 'Username and Password should not be blanck.'
            };
            console.log($scope.showMsg);
        }
    }
}).
controller('logoutCtrl', function($scope) {
    delete $cookies['isLoggedIn'];
    delete $rootScope.currentUser;
}).
controller('mydashboardCtrl', function($scope) {
    
}).
controller('maindashboardCtrl', function($scope) {
    
})


