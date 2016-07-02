// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    EmployeeListView.prototype.template = Handlebars.compile($("#employee-list-tpl").html());
    
    /* ---------------------------------- Local Variables ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        $('body').html(new HomeView(service).render().$el);

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

}());