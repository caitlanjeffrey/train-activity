    
    // start of document

    // toggle support event listeners
      $(document).ready(function(){
        $("table").hide()

        $("#scheduler-page").on("click", function(){
          $("#book-tickets").hide()
          $("table").show()
        })

        $("#home-page").on("click", function(){
          $("#book-tickets").show()
          $("table").hide()
        })
      })

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCzvO32Xu-ss0JXSeVfYYPeNwi_eBkB9f4",
        authDomain: "train-homework-ea0e3.firebaseapp.com",
        databaseURL: "https://train-homework-ea0e3.firebaseio.com",
        projectId: "train-homework-ea0e3",
        storageBucket: "train-homework-ea0e3.appspot.com",
        messagingSenderId: "729562840126",
        appId: "1:729562840126:web:f28ac853497cbd90fbe56f"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    var trainName = "";
    var desination = "";
    var firstTrain = "";
    var frequencyOfTrain = "";
    
    $("#submit").on("click", function(event){
      event.preventDefault();

      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      frequencyOfTrain = $("#frequency").val().trim();
      firstTrain = $("#first-train").val().trim();

      database.ref().push({
        trainName: trainName,
        destination: destination,
        frequencyOfTrain: frequencyOfTrain,
        firstTrain: firstTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
      });

    });

    database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot){
      //console.log("+- calling child_added");

      console.log(childSnapshot.val());
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().frequencyOfTrain);
      console.log(childSnapshot.val().firstTrain);

      var input = $("<tr>");
      $("tbody").append(input);
      $(input).append("<td>" + childSnapshot.val().trainName);
      $(input).append("<td>" + childSnapshot.val().destination);
      $(input).append("<td>" + childSnapshot.val().frequencyOfTrain);

      var timeArr = firstTrain.split(":");
      var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);

      var frequencyOfTrain = childSnapshot.val().frequencyOfTrain

      var currentTime = moment();
      console.log("<--- Current Time: " + moment(currentTime).format("HH:mm"));

      var firstTrainConverted = moment(trainTime, "HH:mm").subtract(1, "years");
      console.log("<--- First Time: "+ firstTrainConverted);

      var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
      console.log("<--- Difference in Time: " + diffTime);

      var timeRemaining = diffTime % frequencyOfTrain;
      console.log("<--- Remainder: "+timeRemaining);

      var nextArrival = frequencyOfTrain - timeRemaining;
      console.log("<--- Minutes Till Train: " + nextArrival);
      $("<td>").append(nextArrival);

      // $("tbody").append(nextArrival);
      // $(nextArrival).append("<td>")

      // var nextTrain = moment().add(nextArrival, "minutes");
      // console.log(nextTrain)
      // $(nextTrain).append("<tc>");
      

    }), function(errorObject){
      console.log("The read failed: " + errorObject);
    }
