/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit, Input } from '@angular/core';
import { PlayService } from '../../../services/play.service';
import { FileService } from '../../../services/file.service';
import { SocketService } from '../../../socket';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  providers: [PlayService, SocketService],
})
export class PlayComponent implements OnInit {
  listQ;
  listP;
  listD;
  tab = 0;
  selectedQuestion;
  selectedProblem;
  selectedDesign;
  selectIndex = 0;
  selectProblemIndex = 0;
  selectDesignIndex = 0;
  fullPlay = null;
  time;
  preTime;
  status;
  timeDis = { minute: 0, seconds: 0 };
  studentId;
  token;
  problemFile: File = null;
  designFile: File = null;

  @Input() socket: SocketService;
  constructor(private play: PlayService, private file: FileService) {}

  ngOnInit(): void {
    this.studentId = localStorage.getItem('studentId');
    this.token = localStorage.getItem('token');
    this.onLogin();
    this.GetQuestion();
    this.onQuestion();
  }

  onLogin() {
    this.socket.onLogin().subscribe(() => {
      this.socket.login({ command: 1000, token: this.token });
    });
  }

  onQuestion() {
    this.socket.onQuestion().subscribe((result) => {
      if (result.data.status == 0 || result.data.status == 1) {
        this.time = result.data.time;
        this.listQ = result.data.history.questions;
        this.listP = result.data.history.problems;
        this.listD = result.data.history.designs;
        this.status = true;
        this.run();
      } else {
        this.status = false;
      }
    });
  }

  GetQuestion() {
    this.play.GetQuestion(this.studentId).then((result) => {
      if (result.data.status == 0 || result.data.status == 1) {
        this.fullPlay = result;
        this.time = result.data.time;
        this.listQ = result.data.history.questions;
        this.listP = result.data.history.problems;
        this.listD = result.data.history.designs;
        this.selectedQuestion = result.data.history.questions[0];
        this.status = true;
        this.run();
      } else {
        this.status = false;
      }
    });
  }

  SelectAns(event) {
    this.selectedQuestion.answer = event.target.innerText;
    this.selectedQuestion.answered = true;
    this.fullPlay.data.time = this.time;
    this.fullPlay.comand = 1000;
    this.socket.emitAnswer(this.fullPlay);
    this.socket.onQuestion().subscribe((result) => {
      if (result.data.status == 0 || result.data.status == 1) {
        this.fullPlay = result;
        this.time = result.data.time;
        this.listQ = result.data.history.questions;
        this.listP = result.data.history.problems;
        this.status = true;
      } else {
        this.status = false;
      }
    });
  }

  run() {
    const self = this;
    clearInterval(this.preTime);
    this.preTime = setInterval(function () {
      if (self.time > 0) {
        self.time--;
        const minute = Math.floor(self.time / 60) ? Math.floor(self.time / 60) : 0;
        const seconds = self.time - minute * 60;
        self.timeDis = { minute: minute, seconds: seconds };
      }
      if (self.time >= 0) self.socket.emitAnswer({ comand: 2000, data: self.fullPlay, time: self.time });
      if (self.time == 0) {
        clearInterval(self.preTime);
        self.socket.emitAnswer({ comand: 3000, studentId: self.studentId });
      }
      if (self.time <= 0) clearInterval(self.preTime);
    }, 1000);
  }

  //========================================================================================================================

  onSelect(quest, i) {
    this.selectIndex = i;
    this.selectedQuestion = quest;
    this.tab = 0;
  }

  onSelectProblem(problem, i) {
    this.selectedProblem = problem;
    this.selectProblemIndex = i;
    this.tab = 1;
  }

  onSelectDesign(design, i) {
    this.selectedDesign = design;
    this.selectDesignIndex = i;
    this.tab = 2;
    console.log(this.tab);
  }

  //========================================================================================================================

  Last() {
    if (this.selectIndex != 0) this.selectedQuestion = this.listQ[--this.selectIndex];
  }

  Next() {
    if (this.selectIndex != this.listQ.length - 1) this.selectedQuestion = this.listQ[++this.selectIndex];
  }

  LastProblem() {
    if (this.selectProblemIndex != 0) this.selectedProblem = this.listP[--this.selectProblemIndex];
  }

  NextProblem() {
    if (this.selectProblemIndex != this.listP.length - 1) this.selectedProblem = this.listP[++this.selectProblemIndex];
  }

  LastDesign() {
    if (this.selectDesignIndex != 0) this.selectedDesign = this.listD[--this.selectDesignIndex];
  }

  NextDesign() {
    if (this.selectDesignIndex != this.listD.length - 1) this.selectedDesign = this.listD[++this.selectDesignIndex];
  }

  //========================================================================================================================

  setButton() {
    if (this.selectIndex == 0) {
      return 1;
    } else if (this.selectIndex != this.listQ.length - 1) {
      return 3;
    } else {
      return 2;
    }
  }

  setProblemButton() {
    if (this.selectProblemIndex == 0) {
      return 1;
    } else if (this.selectProblemIndex != this.listP.length - 1) {
      return 3;
    } else {
      return 2;
    }
  }

  setDesignButton() {
    if (this.selectDesignIndex == 0) {
      return 1;
    } else if (this.selectDesignIndex != this.listD.length - 1) {
      return 3;
    } else {
      return 2;
    }
  }

  handleProblemFile(files: FileList) {
    this.problemFile = files.item(0);
  }
  handleDesignFile(files: FileList) {
    this.designFile = files.item(0);
  }

  onSendFileP() {
    const formData: FormData = new FormData();
    const extention = this.problemFile.name.split('.').pop();
    const problemId = this.selectedProblem.problemId._id;
    const studentId = localStorage.getItem('studentId');
    formData.append('file', this.problemFile, studentId + '-' + problemId + '.' + extention);
    this.file.SendProblem(formData).then((result) => {
      alert(result.body.message);
    });
  }
  onSendFileD() {
    const formData: FormData = new FormData();
    const extention = this.designFile.name.split('.').pop();
    const problemId = this.selectedDesign._id;
    const studentId = localStorage.getItem('studentId');
    formData.append('file', this.designFile, studentId + '-' + problemId + '.' + extention);
    this.file.SendDesign(formData).then((result) => {
      alert(result.body.message);
    });
  }
}
