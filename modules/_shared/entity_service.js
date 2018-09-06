window.__SIMULATED = true;

app.factory('entity_service',
 function ($q, $http, blockUI, MetaService, DataService, $uibModal, uiLoad, PDialog, $translate) {
     var service = {}


     // --------------------------------------------------------------------------------------->
     // user
     // --------------------------------------------------------------------------------------->

     service.addEditUser = function (userId) {
         var deferred = $q.defer();
         blockUI.start();
         var q = {
             controller: MetaService.load(['modules/users/user_modal.js'])
         }
         if (userId) {
             q.user = DataService.getDetails("users", { id: userId });
         }
         $q.all(q).then(function (ret) {
             blockUI.stop();
             var modalEntity = $uibModal.open({
                 templateUrl: 'modules/users/user_modal.html',
                 controller: 'user_modal',
                 windowClass: "modal-flat",
                 size: 'sm',
                 resolve: {
                     modalParams: ret
                 }
             });
             modalEntity.result.then(function (ret) { deferred.resolve(ret); }).catch(function () { });
         }).catch(function (err) {
             blockUI.stop();
             console.error(err);
         });
         return deferred.promise;
     };


     // --------------------------------------------------------------------------------------->
     // group
     // --------------------------------------------------------------------------------------->
     
     service.addEditGroup = function (groupId) {
         var deferred = $q.defer();
         blockUI.start();
         var q = {
             controller: MetaService.load(['modules/portalGroups/group_modal.js'])
         }
         if (groupId) {
             q.group = DataService.getDetails("groups", { id: groupId });
         }
         $q.all(q).then(function (ret) {
             blockUI.stop();
             var modalEntity = $uibModal.open({
                 templateUrl: 'modules/portalGroups/group_modal.html',
                 controller: 'group_modal',
                 windowClass: "modal-flat",
                 size: 'sm',
                 resolve: {
                     modalParams: ret
                 }
             });
             modalEntity.result.then(function (ret) { deferred.resolve(ret); }).catch(function () { });
         }).catch(function (err) {
             blockUI.stop();
             console.error(err);
         });
         return deferred.promise;
     };

     /*
     // --------------------------------------------------------------------------------------->
     // programs
     // --------------------------------------------------------------------------------------->

     service.mapProgramsEnum = function (isEx) {
         if (!MetaService.wasMainEnumsParsed) {
             MetaService.units = _.filter(MetaService.programs_tree, { level: 0 });
             MetaService.subUnits = _.filter(MetaService.programs_tree, { level: 1 });
             MetaService.subjects = _.filter(MetaService.programs_tree, { level: 2 });
             MetaService.wasMainEnumsParsed = true;


         };         
     }

     service.preparePrgrams = function(programs, programs_data){
        _.each(programs, function(program){
            var programData = null;
            if (programs_data) programData = _.find(programs_data, {id:program.id});
            service.preparePrgram(program, programData)
        });
     }
     service.preparePrgram = function(program, programData){
        //var o = program.hierarchy;
		var o = programData ? programData.hierarchy : program.hierarchy;
        if (o){
            program.$$unit = o.unit;
            program.$$sub_unit = o.sub_unit;
            program.$$subject = o.subject;
        };
        if (programData){
            program.ex = programData;
            _.extend(program, _.omit(programData, ["id", "program", "year", "period"]))
        }
		//console.log("program: ",program);
     }

     service.addEditProgram = function (programId) {
         var deferred = $q.defer();
         blockUI.start();
         var q = {
             controller: MetaService.load(['modules/programs/program_modal.js'])
         }
         if (programId) {
             q.program = DataService.getDetails("programs", { id: programId });
         }
         $q.all(q).then(function (ret) {
             blockUI.stop();
             var modalEntity = $uibModal.open({
                 templateUrl: 'modules/programs/program_modal.html',
                 controller: 'program_modal',
                 windowClass: "modal-flat",
				 backdrop: false,
                 size: 'lg',
                 resolve: {
                     modalParams: ret
                 }
             });
             modalEntity.result.then(function (ret) { deferred.resolve(ret); }).catch(function () { });;
         }).catch(function (err) {
             blockUI.stop();
             console.error(err);
         });
         return deferred.promise;
     };

     // --------------------------------------------------------------------------------------->
     // program ex
     // --------------------------------------------------------------------------------------->

     service.editProgramData = function (filter) {
         var deferred = $q.defer();
         blockUI.start();
         var q = {
             controller: MetaService.load(['modules/programs_ex/program_ex_modal.js']),
             program: DataService.getDetails("programs_ex", filter),
             program_data: DataService.getDetails("programs_data", filter),
             plan_data: DataService.getDetails("plan_data", filter),
         };

         $q.all(q).then(function (ret) {
             ret.args = filter;
             blockUI.stop();
             var modalEntity = $uibModal.open({
                 templateUrl: 'modules/programs_ex/program_ex_modal.html',
                 controller: 'program_ex_modal',
                 windowClass: "modal-flat",
                 animation: false,
                 size: 'lg',
                 resolve: {
                     modalParams: ret,

                 }
             });
             modalEntity.result.then(function (ret) { deferred.resolve(ret); }).catch(function () { });;
         }).catch(function (err) {
             blockUI.stop();
             console.error(err);
         });
         return deferred.promise;
     };
     */






     // --------------------------------------------------------------------------------------->
     // shared
     // --------------------------------------------------------------------------------------->

     return service;
 })

