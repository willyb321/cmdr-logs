'use strict';

/**
* @ngdoc function
* @name clientApp.controller:LoginCtrl
* @description
* # LoginCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('LoginCtrl', function (loaderSvc, ngAudio, $state, auth, toastr, $window) {
    var vm = this;
    vm.auth = auth;
    vm.user = auth.$getAuth();
    vm.clickBtnSound = ngAudio.load('../sounds/buttonClick.mp3');
    vm.clickBtnHover = ngAudio.load('../sounds/buttonHover.mp3');
    vm.playSound = playSound;
    vm.submitForm = submitForm;
    vm.createUser = createUser;
    vm.updateProfile = updateProfile;
    vm.resetPassword = resetPassword;
    vm.cancelAction = cancelAction;
    vm.login = login;
    vm.signOutUser = signOutUser;
    vm.forgotPassword = forgotPassword;
    vm.password = '';
    vm.userEmail = '';
    vm.newUserEmail = '';
    vm.resetEmail = '';
    vm.newPassword = '';
    vm.confirmPassword = '';
    vm.cmdrName = '';
    vm.newCmdrName = '';
    vm.createMode = false;
    vm.resetPasswordMode = false;
    vm.detect = {
        isElectron: false,
        osType: ''
    };
    vm.download = download;

    function init() {
        isElectron();
    }

    function download(term) {
        if (term === 'Windows') {
            $window.location.href = 'https://github.com/bpkennedy/cmdr-logs/releases/1.0.1/CommanderLog.dmg';
        } else if (term === 'Mac') {
            $window.location.href = 'https://github.com/bpkennedy/cmdr-logs/releases/1.0.1/commanderLogWin.7z';
        }
    }

    function isElectron() {
        if ((typeof process !== 'undefined') && process.versions && (process.versions.electron !== undefined)) {
            vm.detect.isElectron = true;
        } else {
            setOsType();
        }
    }

    function setOsType() {
        var platform = $window.platform;
        if (platform.os.family.indexOf('Windows') > -1 || platform.description.indexOf('Windows') > -1) {
            vm.detect.osType = 'Windows';
        } else if (platform.os.family.indexOf('Mac') > -1 || platform.description.indexOf('Mac') > -1 || platform.os.family.indexOf('OS X') > -1) {
            vm.detect.osType = 'Mac';
        } else {
            vm.detecet.isElectron = false;
        }
    }

    function submitForm(isValid) {
        if (isValid) {
            playSound('click');
            if (vm.createMode) {
                createUser();
            } else {
                login();
            }
        }
    }

    function resetPassword() {
        vm.createMode = false;
        vm.resetPasswordMode = true;
    }

    function cancelAction() {
        vm.createMode = false;
        vm.resetPasswordMode = false;
    }

    function forgotPassword() {
        vm.auth.$sendPasswordResetEmail(vm.resetEmail).then(function() {
            vm.resetPasswordMode = false;
            toastr.success('Password reset email sent to ' + vm.resetEmail, 'Success!');
        }).catch(function(error) {
            toastr.error(error.message, error.code);
        });
    }

    function login() {
        loaderSvc.toggleOnText('Retrieving data..');
        vm.auth.$signInWithEmailAndPassword(vm.userEmail, vm.password).then(function(firebaseUser) {
            vm.user = auth.$getAuth();
            var name = vm.user.displayName || vm.user.email;
            $state.go('root.dashboard', {isNew:false});
            toastr.success('Welcome back ' + name, 'Yo!');
            loaderSvc.toggleOff();
        }).catch(function(error) {
            toastr.error(error.message, error.code);
        });
    }

    function createUser() {
        vm.auth.$createUserWithEmailAndPassword(vm.newUserEmail, vm.newPassword).then(function() {
            updateProfile(vm.cmdrName, 'new');
        }).catch(function(error) {
            toastr.error(error.message, error.code);
        });
    }

    function updateProfile(commanderName, isNew) {
        playSound('click');
        var user = $window.firebase.auth().currentUser;
        user.updateProfile({
            displayName: commanderName
        }).then(function() {
            vm.newCmdrName = '';
            toastr.success('Updated profile.', 'Success!');
            if (isNew) {
                $state.go('root.dashboard');
            }
        }, function(error) {
            toastr.error(error.message, error.code);
        });
    }

    function signOutUser() {
        playSound('click');
        vm.auth.$signOut().then(function(firebaseUser) {
            vm.user = firebaseUser;
            toastr.success('You signed out.', 'Success!');
        }).catch(function(error) {
            toastr.error(error.message, error.code);
        });
    }

    function playSound(type) {
        if (type === 'click') {
            vm.clickBtnSound.play();
        } else if (type === 'hover') {
            vm.clickBtnHover.play();
        }
    }

    init();

});
