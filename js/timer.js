$(function () {
    var t = window.TrelloPowerUp.iframe();
    t.sizeTo('.container');

    if(isMPAutorized()){
        _mpAjax({
            method: 'GET',
            url: 'timer/projects',
            params: {},
            success: function (response) {
                var data = response.data;
                var optgroups = {};
                var dd = $('#project_id');
                dd.append('<option value=""></option>');
                $.each(data,function (index, project) {
                    if(!optgroups.hasOwnProperty(project.client_name)){
                        optgroups[project.client_name] = $('<optgroup label="'+project.client_name+'">');
                        dd.append(optgroups[project.client_name]);
                    }
                    optgroups[project.client_name].append('<option value="'+project.id+'">'+project.name+'</option>')
                });
            }
        });

        _mpAjax({
            method: 'GET',
            url: 'timer/status',
            params: {},
            success: function (response) {
                var data = response.data;
            },
            error: function (data) {
                if (data.status == 401) {
                    localStorage.removeItem('mp_token');
                }
            }
        });
    }
});