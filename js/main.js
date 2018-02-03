(function(){
//    with geolocation method, lets find our current position
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,error)
    }else{
        alert('Location not available')
    }
    // getting our current latitude and longitude and save it in variable
    function success(position){
        lat = position.coords.latitude;
        lng = position.coords.longitude;

        // lets get our API key to get the data in json format
        var key = '1e836e05a9f9c72a3397d250da090393'

        // ajax call to retrieve our data
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid="+key,
             dataType: 'json',
            
             success: function(data){
                //  creating a function to convert the wind numeric degree into literal notation
                 function wind(){
                     if(data.wind.deg >= 90 || data.wind.deg <= 180){
                        $('#wind').text("NE "+data.wind.speed+"knots") ;
                     }else if(data.wind.deg >= 180 || data.wind.deg <= 270){
                        $('#wind').text("SE "+data.wind.speed+"knots");
                     }else if(data.wind.deg >= 0 || data.wind.deg <= 90){
                        $('#wind').text("NW "+data.wind.speed+"knots");
                     }else{
                        $('#wind').text("SW "+data.wind.speed+"knots");
                     }
                 }   
                 wind()
                //  displaying the data in html 
                $('#temp').text(data.main.temp);
                $('#location').text(data.name+", "+data.sys.country);
                $('#desc').text(data.weather[0].description);
               
            }
            
        })
        
        
    }
    
    // if anything fails, alert user with a notice.
    function error(){
        alert('We cant find you, sorry!')
    }
}())