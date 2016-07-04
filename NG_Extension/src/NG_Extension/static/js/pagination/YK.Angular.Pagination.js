/*
*基于Angularjs的分页插件
*powered by zhanglei
*   ykpIndex:当前所在页码
*   ykpSize:每页最大显示数量
*   ykpCount:总数据量
*   ykpChanged:页码改变句柄
*   ykpMaxshow:页码最多数量
*   totalShow:是否显示总数据量
*/
angular.module("yk.angular.pagination", [])
.directive("ykpager", function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            pageIndex: "=ykpIndex",
            pageSize: "=ykpSize",
            rowCount: "=ykpCount",
            onPageIndexChanged: "&ykpChanged",
            pagePerGroup: "@ykpMaxshow",
            totalShow: '@'
        },
        templateUrl: "/static/js/pagination/YK.Angular.Pagination.Tmpl.html",
        controller: function ($scope) {
            
        },
        link: function (scope) {
            scope.pageCount = 0;
            scope.pageList = [];
            scope.startIndex = scope.endIndex = 0;
            scope.pagePerGroup = 5;

            scope.$watch('pageIndex', function (newValue, oldValue, scope) {
                if (newValue != oldValue) {
                    redrawPager();
                    scope.onPageIndexChanged();
                }
            });
            scope.$watch('pageSize', function (newValue, oldValue, scope) {
                if (newValue != oldValue) {
                    redrawPager();
                }
            });
            scope.$watch('rowCount', function (newValue, oldValue, scope) {
                if (newValue != oldValue) {
                    scope.pageIndex = 0
                    redrawPager();
                }
            });
            function redrawPager() {
                scope.pageCount = Math.ceil(parseInt(scope.rowCount) / parseInt(scope.pageSize));

                var calu = Math.floor(scope.pagePerGroup / 2);

                scope.startIndex = Math.max(scope.pageIndex - calu, 0);
                scope.endIndex = Math.min(scope.pageIndex + calu, scope.pageCount - 1);

                scope.pageList.splice(0);

                for (var i = scope.startIndex; i <= scope.endIndex; i++) {
                    scope.pageList.push(i);
                }
            }
            
            scope.gotoNext = function () {
                var index = parseInt(scope.pageIndex) + 1;
                if (index > parseInt(scope.pageCount) - 1) {
                    index = parseInt(scope.pageCount) - 1;
                }
                scope.goto(index);
            };

            scope.gotoPrev = function () {
                var index = parseInt(scope.pageIndex) - 1;
                if (index < 0) {
                    index = 0;
                }
                scope.goto(index);
            };
            scope.goto = function (index) {
                var oldIndex = parseInt(scope.pageIndex);
                scope.pageIndex = index;
            };

            redrawPager();
        }
    };
});