// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());
    
    /* ---------------------------------- Local Variables ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        renderHomeView();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function() {
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#ffffff');
        StatusBar.styleDefault();

        FastClick.attach(document.body);
        if(navigator.notification) { // Override default HTML Dialog
            window.alert = function(message) {
                navigator.notification.alert(message, // Message
                                             null, // Callback
                                             "Workshop", // Title
                                             'Ok'); // Button Name
            };
        }
    },false );
    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        service.findByName($('.search-key').val()).done(function (employees) {
            $('.content').html(employeeListTpl(employees));
        });
    }
    
    function renderHomeView() {
        $('body').html(homeTpl());
        $('.search-key').on('keyup', findByName);
    }

}());