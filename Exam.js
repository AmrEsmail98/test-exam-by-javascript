//allquestions
(function () {
  var allQuestions = [{
    question: "What is 5*2:",
    options: ["5", "7", "10", "15"],
    answer: 2
  }, {
    question: "What is 3*6:",
    options: ["9", "15", "21", "18"],
    answer: 3
  }, {
    question: "What is 4*4:",
    options: ["20", "16", "8", "24"],
    answer: 1
  }, {
    question: "What is 6*6",
    options: ["36", "30", "42", "12"],
    answer: 0
  }, {
    question: "What is 2*9:",
    options: ["11", "18", "20", "22"],
    answer: 1
  }, {
    question: "What is 5*6:",
    options: ["30", "25", "20", "60"],
    answer: 0
  }, {
    question: "What is 4*9:",
    options: ["36", "32", "20", "24"],
    answer: 0
  }, {
    question: "What is 7*7:",
    options: ["14", "42", "48", "49"],
    answer: 3
  }, {
    question: "What is 9*9:",
    options: ["18", "39", "81", "65"],
    answer: 2
  }, {
    question: "What is 10*10:",
    options: ["100", "112", "90", "200"],
    answer: 0
  }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');

  //timer
  const startingminutes = 30;
  let time = startingminutes * 60;
  const countdown = document.getElementById('countdown');
  var interval = setInterval(updatecountdown, 1000);
  function updatecountdown() {
    const min = Math.floor(time / 60);
    let sec = time % 60;
    sec = sec < 10 ? '0' + sec : sec;
    countdown.innerHTML = `${min}:${sec}`;
    time--;
    
  }
  //next q and test or not select
  nextQuestion();

  $('#next').click(function () {
    chooseOption();
    if (isNaN(selectOptions[quesCounter])) {
      alert('Please select an option !');
    }
    else {
      quesCounter++;
      nextQuestion();
    }

  });
//back question
  $('#back').click(function () {
    chooseOption();
    quesCounter--;
    nextQuestion();
  });

  // id question and number
  function createElement(index) {
    var element = $('<div>', { id: 'question' });
    var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
    element.append(header);

    var question = $('<p>').append(allQuestions[index].question);
    element.append(question);

    var radio = radioButtons(index);
    element.append(radio);

    return element;
  }
//choose
  function radioButtons(index) {
    var radioItems = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < allQuestions[index].options.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += allQuestions[index].options[i];
      item.append(input);
      radioItems.append(item);
    }
    return radioItems;
  }

  function chooseOption() {
    selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
  }

  function nextQuestion() {
    quizSpace.fadeOut(function () {
      $('#question').remove();
      if (quesCounter < allQuestions.length) {
        var nextQuestion = createElement(quesCounter);
        quizSpace.append(nextQuestion).fadeIn();
        if (!(isNaN(selectOptions[quesCounter]))) {
          $('input[value=' + selectOptions[quesCounter] + ']').prop('checked', true);
        }
        if (quesCounter === 1) {
          $('#back').show();
        }
         if (quesCounter === 0) {
          $('#back').hide();
          $('#next').show();
          $('#finish').hide();
        }
        else if (quesCounter === 9) {
          $('#back').show();
          $('#next').hide();
          $('#finish').show();
          $('#finish').on('click', function(){
            $('#next').hide();
            $('#back').hide();
            $('#finish').hide();
            clearInterval(interval);
            $('#question').remove();
            var scoreRslt = displayResult();
            quizSpace.append(scoreRslt).fadeIn();
          })
        }
        
      }

    });
  }

  function displayResult() {
    var score = $('<p>', { id: 'question' });
    var correct = 0;
    for (var i = 0; i < selectOptions.length; i++) {
      if (selectOptions[i] === allQuestions[i].answer) {
        correct++;
      }
      
    }
    score.append('You scored ' + correct *10 + ' from  100');
    
    return score;
    
  }
  

})();