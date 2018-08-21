var answer = []
var answer_key = [];
var correct = 0;
var count = 0;
var incorrect = 0;

function loadresult() {
  stopwatch.stop();

  $("#game").css("display", "none");
  $('input[name="Answers"]:checked').each(function () {
    // alert("Key " + answer_key + " === " + this.value + " Checked ");
    answer.push(this.value)
  });

  $.each(answer, function (index, value) {
    console.log(index + " " + answer_key[index] + " === " + value);
    if (answer_key[index] === value) {
      correct++;
    } else {
      incorrect++;
    }
  });
  // console.log("Correct " + correct + " " + " Incorrect " + incorrect);
  $("#grade").css("display", "none");
  $("#clock").css("display", "none");
  $("#results").text(`Correct  ${correct} Incorrect ${incorrect}`);

}


window.onload = function () {
  $("#start").on("click", stopwatch.start);
  $("#grade").click(function () {

  loadresult();

  });

};


var TriviaGame = {
  questions: [
    {
      question: "How do crickets hear?",
      choices: ["Through their wings", "Through their belly", "Through their knees ", "Through their tongue"],
      answer: "Through their knees"
    },
    {
      question: "Which American city invented plastic vomit?",
      choices: ["Chicago", "Detroit", "Columbus", "Baltimore"],
      answer: "Chicago"
    },
    {
      question: "In ‘Ben Hur’, which modern thing can be seen during the chariot scene?",
      choices: ["A waitress", "A car", "A postbox", "A street lamp"],
      answer: "A car"
    },
    {
      question: "What was Karl Marx’s favorite color?",
      choices: ["Brown", "Blue", "Red", "Purple"],
      answer: "Red"
    },
    {
      question: "What’s the best way to stop crying while peeling onions?",
      choices: ["Lick almonds", "Suck lemons", "Eat cheese", "Chew gum"],
      answer: "Chew gum"
    },
    {
      question: "How old was the youngest Pope?",
      choices: ["11", "17", "22", "29"],
      answer: "11"
    },
    {
      question: "Which animal sleeps for only five minutes a day?",
      choices: ["A chameleon", "A koala", "A giraffe", "A beaver"],
      answer: "A giraffe"
    },
    {
      question: "How many words in the English language end in “dous”?",
      choices: ["Two", "Four", "Six", "Eight"],
      answer: "Four"
    },
    {
      question: "One human hair can support how many kilograms?",
      choices: ["Three", "Five", "Seven", "Nine"],
      answer: "Three"
    },
    {
      question: "The bikini was originally called the what?",
      choices: ["Poke", "Half", "Range", "Atom"],
      answer: "Atom"
    }
  ]
};
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our stopwatch object
var stopwatch = {

  time: 30,
  lap: 1,

  reset: function () {

    stopwatch.time = 0;
    stopwatch.lap = 1;
    // DONE: Change the "display" div to "00:00."
    $("#clock").text("00:30");
  },
  start: function () {
    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
      $("#onebutton").css("display", "none");
      $("#buttons").css("display", "block");
      $("#clock").css("display", "block");
      $("#game").css("display", "block");
      $("#results").css("display", "block");


      questions = TriviaGame.questions;
      for (var i = 0; i < questions.length; i++) {

        var a = $("<div>");
        a.addClass("question-class");
        a.attr("data-name", i + 1);
        a.text("Question " + (i + 1) + ": " + questions[i].question);
        choose = questions[i].choices;
        $("#game").append(a);

        var form = $("<form>");
        form.attr("id", (i + 1));
        form.attr("data-group", i + 1);
        form.attr("required");

        $("#game").append(form);

        for (var j = 0; j < choose.length; j++) {

          var input = $('<input>');
          // input.addClass("question");
          input.attr("Type", 'radio');
          input.attr("value", choose[j]);
          input.attr("name", "Answers");
          $("#" + (i + 1)).append(input);

          var label = $('<label>');
          // label.addClass("question");
          label.attr("for", i + 1);
          label.text("" + choose[j]);
          $("#" + (i + 1)).append(label);
          $("#" + (i + 1)).append("<br>");
        }
        answer_key.push(questions[i].answer);
      }
    }
    $("#end-of-game").css("display", "block");
  },
  stop: function () {

    clearInterval(intervalId);
    clockRunning = false;

  },

  count: function () {

    // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time--;
    if (stopwatch.time === 0) {
      clearInterval(intervalId);
      clockRunning = false;
      $("#onebutton").css("display", "none");
      $("#buttons").css("display", "none");
      $("#clock").css("display", "none");
      $("#game").css("display", "none");
      $("#forms").css("display", "none");
      loadresult();
    }
    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#clock").text(converted);
  },
  timeConverter: function (t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};
