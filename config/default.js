module.exports = {

     "Redis":
  {
    "mode":"sentinel",//instance, cluster, sentinel
    "ip": "45.55.142.207",
    "port": 6389,
    "user": "duo",
    "password": "DuoS123",
    "sentinels":{
      "hosts": "138.197.90.92,45.55.205.92,138.197.90.92",
      "port":16389,
      "name":"redis-cluster"
    }

  },

  "Security":
  {

    "ip" : "45.55.142.207",
    "port": 6389,
    "user": "duo",
    "password": "DuoS123",
    "mode":"sentinel",//instance, cluster, sentinel
    "sentinels":{
      "hosts": "138.197.90.92,45.55.205.92,138.197.90.92",
      "port":16389,
      "name":"redis-cluster"
    }
  },
    "Host":
    {
        "vdomain": "localhost",
        "domain": "localhost",
        "ip": "127.0.0.1",
        "port": 3868,
        "version": "1.0.0.0"
    },

    "LBServer" : {

        "ip": "localhost",
        "port": "3434"

    },


    "Services" : {
        //"billingServiceHost": "billingservice.app.veery.cloud",
        "diameterServerHost": "localhost",
        //192.168.1.16"userserrvice.app.veery.cloud",
        "diameterServerPort": "5555",
        "diameterServerVersion": "1.0.0.0"

    }



};
