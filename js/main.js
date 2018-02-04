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

        var icon = document.getElementById("icon")

        // ajax call to retrieve our data
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid="+key,
             dataType: 'json',
            
             success: function(data){
                //  creating a function to convert the wind numeric degree into literal notation
                 function wind(){
                     if(data.wind.deg >= 90 || data.wind.deg <= 180){
                        $('#wind').text("NE "+data.wind.speed+"mph") ;
                     }else if(data.wind.deg >= 180 || data.wind.deg <= 270){
                        $('#wind').text("SE "+data.wind.speed+"mph");
                     }else if(data.wind.deg >= 0 || data.wind.deg <= 90){
                        $('#wind').text("NW "+data.wind.speed+"mph");
                     }else{
                        $('#wind').text("SW "+data.wind.speed+"mph");
                     }
                 }   
                 wind()
                //  displaying the data in html 
                // creating a variable x and change the kelvin value into Farenheit.
                var x =  Math.round(data.main.temp * 9/5 - 459.67)
                $('#temp').text(x+"F");
                $('#location').text(data.name+", "+data.sys.country);
                $('#desc').text(data.weather[0].description);
                //  linking the image source to get the png image for the weather condition.
                icon.src =   "http://openweathermap.org/img/w/"+data.weather[0].icon + ".png"
            }
            
        })
        
        
    }
    
    // if anything fails, alert user with a notice.
    function error(){
        alert('We cant find you, sorry!')
    }
}())