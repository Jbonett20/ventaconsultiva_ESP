var scorm = pipwerks.SCORM;
var lmsConnected = true;
var learnername = "";
function handleError(msg) {
  console.log(msg);
  window.close();
}

$("body").on("click", "#SalirBtn", function (e) {
  completaCourse(1);
});

function SalirLMS() {
  scorm.quit();
}

var scorm = pipwerks.SCORM;
var lmsConnected = true;

$(document).ready(function () {
  iniciaBrowse();
  $("#PlayAudio").hide();
});

function iniciaBrowse() {
  console.log("IniciaBrowse");
  lmsConnected = scorm.init();
  if (lmsConnected) {
    learnername = scorm.get("cmi.core.student_name");
    $("#NameUsr").html(learnername);
    var completionstatus = scorm.get("cmi.core.lesson_status");
    if (completionstatus == "completed" && completionstatus == "passed") {
      var success = scorm.set("cmi.core.lesson_status", completionstatus);
      console.log("passed");
    } else {
      var success = scorm.set("cmi.core.lesson_status", "browsed");
      console.log("browsed");
    }
  } else {
    console.log("Error: No ha sido posible conectar con el LMS");
  }
  scorm.save();
}
function completaCourse(exit) {
  console.log("completaCourse");
  var Recargar = 0;
  if (lmsConnected) {
    if ($("#finalizado").val() == "SI") {
      var success = scorm.set("cmi.core.lesson_status", "completed");
    } else {
      var success = scorm.set("cmi.core.lesson_status", "incompleted");
    }
  } else {
    console.log("Error: No ha sido posible conectar con el LMS");
  }
  if (exit == 1 && Recargar == 0) {
    scorm.save();
    console.log("completed save: " + success);
    $("#Container").html(
      '<div class="loading"><img src="../images/loading.gif" width="110px"></div>'
    );
    setTimeout(SalirLMS, 8000);
  }
  scorm.save();
}
var Gl_audioCtrl = 0;
var audioDiapo = 0;

$("#StopAudio").click(function () {
  Gl_audioCtrl = 1;
  //$('#audio_objetivo').trigger('pause');
  $("#tab-" + diapositiva)
    .find("audio")
    .trigger("pause");
  $("#StopAudio").hide();
  $("#PlayAudio").show();
});

$("#PlayAudio").click(function () {
  Gl_audioCtrl = 0;
  $("#tab-" + diapositiva)
    .find("audio")
    .trigger("play");
  //$('#audio_objetivo').trigger('play');
  $("#StopAudio").show();
  $("#PlayAudio").hide();
});
