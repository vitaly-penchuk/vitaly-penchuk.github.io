$(function () {
    var t = window.TrelloPowerUp.iframe();
    t.sizeTo('.container');

    var project_dd = $('#project_id');

    var task_dd = $('#task_id');

    project_dd.on('change',function (e) {
       var node = $(this);
       var val = node.val();
       if(val != ''){
           populateTasks(val);
       }else{
           task_dd.html('').val('');
       }
    });

    var populateProjects = function () {
        _mpAjax({
            method: 'GET',
            url: 'timer/projects',
            params: {},
            success: function (response) {
                var data = response.data;
                var optgroups = {};
                project_dd.html('').val('');
                project_dd.append('<option value=""></option>');
                $.each(data,function (index, project) {
                    if(!optgroups.hasOwnProperty(project.client_name)){
                        optgroups[project.client_name] = $('<optgroup label="'+project.client_name+'">');
                        project_dd.append(optgroups[project.client_name]);
                    }
                    optgroups[project.client_name].append('<option value="'+project.id+'">'+project.name+'</option>')
                });
            }
        });
    };

    var populateTasks = function (project_id) {
        _mpAjax({
            method: 'GET',
            url: 'timer/project/'+project_id+'/tasks',
            params: {},
            success: function (response) {
                var data = response.data;
                task_dd.html('').val('');
                task_dd.append('<option value=""></option>');
                $.each(data,function (index, task) {
                    task_dd.append('<option value="'+task.id+'">'+task.name+'</option>')
                });

            }
        });
    };

    if(isMPAutorized()){
        _mpAjax({
            method: 'GET',
            url: 'timer/status',
            params: {},
            success: function (response) {
                var data = response.data;
                console.log(data);
                populateProjects();
            },
            error: function (data) {
                if (data.status == 401) {
                    localStorage.removeItem('mp_token');
                }
            }
        });
    }
});