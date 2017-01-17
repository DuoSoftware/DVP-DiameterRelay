module.exports = {


    "Security":
    {
        "ip": "SYS_REDIS_HOST",
        "port": "SYS_REDIS_PORT",
        "user": "SYS_REDIS_USER",
        "password": "SYS_REDIS_PASSWORD"

    },

    "Host":
    {
        "domain": "HOST_NAME",
        "ip": "HOST_IP",
        "port": "HOST_PORT",
        "version": "HOST_VERSION"
    },

    "LBServer" : {

        "ip": "LB_FRONTEND",
        "port": "LB_PORT"

    },


    "Services" : {
        "billingServiceHostIP": "SYS_BILLINGSERVICE_HOST_IP",
        "billingServicePort": "SYS_BILLINGSERVICETCP_PORT",
        "billingServiceVersion": "SYS_BILLINGSERVICE_VERSION"

    }
};
