'use strict';

angular.module('xenon.services', []).
        service('$menuItems', function ()
        {
            this.menuItems = [];

            var $menuItemsRef = this;

            var menuItemObj = {
                parent: null,
                title: '',
                link: '', // starting with "./" will refer to parent link concatenation
                state: '', // will be generated from link automatically where "/" (forward slashes) are replaced with "."
                icon: '',
                isActive: false,
                label: null,
                menuItems: [],
                setLabel: function (label, color, hideWhenCollapsed)
                {
                    if (typeof hideWhenCollapsed == 'undefined')
                        hideWhenCollapsed = true;

                    this.label = {
                        text: label,
                        classname: color,
                        collapsedHide: hideWhenCollapsed
                    };

                    return this;
                },
                addItem: function (title, link, icon)
                {
                    var parent = this,
                            item = angular.extend(angular.copy(menuItemObj), {
                                parent: parent,
                                title: title,
                                link: link,
                                icon: icon
                            });

                    if (item.link)
                    {
                        if (item.link.match(/^\./))
                            item.link = parent.link + item.link.substring(1, link.length);

                        if (item.link.match(/^-/))
                            item.link = parent.link + '-' + item.link.substring(2, link.length);

                        item.state = $menuItemsRef.toStatePath(item.link);
                    }

                    this.menuItems.push(item);

                    return item;
                }
            };

            this.addItem = function (title, link, icon)
            {
                var item = angular.extend(angular.copy(menuItemObj), {
                    title: title,
                    link: link,
                    state: this.toStatePath(link),
                    icon: icon
                });

                this.menuItems.push(item);

                return item;
            };

            this.getAll = function ()
            {
                return this.menuItems;
            };

            this.prepareHorizontalMenu = function ()
            {
                var dashboard = this.addItem('Dashboard', '/app/dashboard', 'linecons-desktop');
                var setting = this.addItem('Setting', '/app/setting', 'linecons-cog');
                var reports = this.addItem('Reports', '/app/dashboard', 'linecons-note');
                var more = this.addItem('More', '/app/setting', 'linecons-beaker');

                dashboard.addItem('Main Dashboard', '-/maindashboard'); // "-/" will append parents link
                dashboard.addItem('My Dashboard', '-/mydashboard');

                setting.addItem('Add New Member', '-/add_member'); // "-/" will append parents link
                setting.addItem('User Management', '-/user_management');
                setting.addItem('Change Password', '-/change_password');

                reports.addItem('Activity', '-/variant-1'); // "-/" will append parents link
                reports.addItem('MIS', '-/variant-2');
                reports.addItem('Summery', '-/variant-2');

                more.addItem('Leads Converted', '-/variant-1'); // "-/" will append parents link
                more.addItem('Closed', '-/variant-2');
                more.addItem('Contacts', '-/variant-2');
                more.addItem('Calender', '-/calender');
                 more.addItem('Repeat Order', '-/calender');



                return this;
            }

            this.instantiate = function ()
            {
                return angular.copy(this);
            }

            this.toStatePath = function (path)
            {
                return path.replace(/\//g, '.').replace(/^\./, '');
            };

            this.setActive = function (path)
            {
                this.iterateCheck(this.menuItems, this.toStatePath(path));
            };

            this.setActiveParent = function (item)
            {
                item.isActive = true;
                item.isOpen = true;

                if (item.parent)
                    this.setActiveParent(item.parent);
            };

            this.iterateCheck = function (menuItems, currentState)
            {
                angular.forEach(menuItems, function (item)
                {
                    if (item.state == currentState)
                    {
                        item.isActive = true;

                        if (item.parent != null)
                            $menuItemsRef.setActiveParent(item.parent);
                    }
                    else
                    {
                        item.isActive = false;
                        item.isOpen = false;

                        if (item.menuItems.length)
                        {
                            $menuItemsRef.iterateCheck(item.menuItems, currentState);
                        }
                    }
                });
            }
        });