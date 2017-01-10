'use strict';

/**
* @ngdoc service
* @name clientApp.entries
* @description
* # entries
* Factory in the clientApp.
*/
angular.module('clientApp')
.factory('entries', function ($q, $window) {
    var vm = this;
    vm.database = $window.firebase.database();

    function getUserEntries(uid) {
        return $window.firebase.database().ref('/users/' + uid + '/entries').once('value');
    }

    function getSingleEntry(key) {
        return $window.firebase.database().ref('/entries/' + key).once('value');
    }

    // function createEntry(entry, uid) {
    //     // Generate a reference to a new location and add some data using push()
    //     var newEntryRef = vm.database.ref('entries/').push({
    //       title: entry.title,
    //       message: entry.message,
    //       created_at: vm.database.ServerValue.TIMESTAMP,
    //       created_by: parseInt(uid)
    //   });
    //     // Get the unique ID generated by push() by accessing its key
    //     var EntryId = newEntryRef.key;
    //
    // }

    return {
        getUserEntries: getUserEntries,
        getSingleEntry: getSingleEntry
        // createEntry: createEntry
    };
});
