'use strict';

/**
* @ngdoc directive
* @name clientApp.directive:smoke
* @description
* # smoke
*/
angular.module('clientApp').directive('loader', function spinner() {
    return {
        restrict: 'EA',
        scope: {
            title: '@'
        },
        template:
        '<div class="loader-wrapper" ng-if="vm.state().isShowing">' +
            '<div class="loader-inner-wrap">' +
                '<div style="" id="loader">' +
                  '<svg width="100" height="100" viewBox="0 0 40 40"><path d="m5,8l5,8l5,-8z" class="l1 d1"></path><path d="m5,8l5,-8l5,8z" class="l1 d2"></path><path d="m10,0l5,8l5,-8z" class="l1 d3"></path><path d="m15,8l5,-8l5,8z" class="l1 d4"></path><path d="m20,0l5,8l5,-8z" class="l1 d5"></path><path d="m25,8l5,-8l5,8z" class="l1 d6"></path><path d="m25,8l5,8l5,-8z" class="l1 d7"></path><path d="m30,16l5,-8l5,8z" class="l1 d8"></path><path d="m30,16l5,8l5,-8z" class="l1 d9"></path><path d="m25,24l5,-8l5,8z" class="l1 d10"></path><path d="m25,24l5,8l5,-8z" class="l1 d11"></path><path d="m20,32l5,-8l5,8z" class="l1 d13"></path><path d="m15,24l5,8l5,-8z" class="l1 d14"></path><path d="m10,32l5,-8l5,8z" class="l1 d15"></path><path d="m5,24l5,8l5,-8z" class="l1 d16"></path><path d="m5,24l5,-8l5,8z" class="l1 d17"></path><path d="m0,16l5,8l5,-8z" class="l1 d18"></path><path d="m0,16l5,-8l5,8z" class="l1 d19"></path><path d="m10,16l5,-8l5,8z" class="l2 d0"></path><path d="m15,8l5,8l5,-8z" class="l2 d3"></path><path d="m20,16l5,-8l5,8z" class="l2 d6"></path><path d="m20,16l5,8l5,-8z" class="l2 d9"></path><path d="m15,24l5,-8l5,8z" class="l2 d12"></path><path d="m10,16l5,8l5,-8z" class="l2 d15"></path></svg>' +
                '</div>' +
                '<div class="message-holder">' +
                    '<div class="message">' +
                        ' {{vm.state().text}} ' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>',
        controller: 'LoaderCtrl',
        controllerAs: 'vm',
        bindToController: true
    };

});


angular.module('clientApp').controller('LoaderCtrl', function loaderCtrl(loaderSvc) {
    var vm = this;
    vm.state = loaderSvc.getState;
});

angular.module('clientApp').factory('loaderSvc', function loaderSvcFunc() {
    var state = {
        isShowing: false,
        text: '',
    };

    function getState() {
        return state;
    }

    function toggleOnText(text) {
        if (text === 'undefined' || text === undefined || text === '' || text === null) {
            state.text = 'STAND BY';
        } else {
            state.text = text;
            state.isShowing = true;
        }
    }

    function toggleOff() {
        state.isShowing = false;
    }

    return {
        getState: getState,
        toggleOnText: toggleOnText,
        toggleOff: toggleOff
    };
});
