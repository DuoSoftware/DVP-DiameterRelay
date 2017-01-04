module.exports = {

    "Security":
    {
        "ip" : "45.55.142.207",
        "port": 6389,
        "user": "duo",
        "password": "DuoS123"
    },


    "Host":
    {
        "vdomain": "localhost",
        "domain": "localhost",
        "ip": "127.0.0.1",
        "port": 3868,
        "version": "1.0",
        "reschedulefreqency": "1",
        "rescheduletries": "3"
    },

    "LBServer" : {

        "ip": "localhost",
        "port": "3434"

    },


    "Services" : {
        //"billingServiceHost": "billingservice.app.veery.cloud",
        "billingServiceHost": "localhost",
        //192.168.1.16"userserrvice.app.veery.cloud",
        "billingServicePort": "5555",
        "billingServiceVersion": "1.0.0.0"

    }



};