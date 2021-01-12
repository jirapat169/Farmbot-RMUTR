import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

const _window: any = window;

@Component({
  selector: 'app-grow-vegetable',
  templateUrl: './grow-vegetable.component.html',
  styleUrls: ['./grow-vegetable.component.scss'],
})
export class GrowVegetableComponent implements OnInit, AfterViewInit {
  public listArr = [
    { img: `${environment.baseHref}assets/vegetables/3039988.svg` },
    { img: `${environment.baseHref}assets/vegetables/2909782.svg` },
    { img: `${environment.baseHref}assets/vegetables/765544.svg` },
  ];
  public tableList: Array<any> = [];

  constructor() {}

  ngAfterViewInit() {
    this.initialData();
  }

  ngOnInit(): void {}

  private setTableList = (
    tableIndex: number,
    vegetableIndex: number = null,
    vagetableElement: any = null
  ) => {
    this.tableList[tableIndex] = {
      vegetableIndex: vegetableIndex,
      vagetableElement: vagetableElement,
    };

    console.log(this.tableList);
  };

  private initialData = () => {
    let vegetables = null,
      tableList = null,
      that = this,
      fillSelected = null;

    initialHtml();
    function initialHtml() {
      vegetables = document.querySelectorAll('.vegetables');
      tableList = document.querySelectorAll('.tableList');

      vegetables.forEach((vegetable) => {
        vegetable.addEventListener('dragstart', dragStart);
        vegetable.addEventListener('dragend', dragEnd);
      });

      tableList.forEach((table) => {
        table.addEventListener('dragover', dragOver);
        table.addEventListener('dragenter', dragEnter);
        table.addEventListener('dragleave', dragLeave);
        table.addEventListener('drop', dragDrop);
      });
    }

    function dragStart() {
      fillSelected = this;
    }

    function dragEnd() {
      this.className = 'vegetables';
      fillSelected = null;
      initialHtml();
    }

    function dragOver(e) {
      e.preventDefault();
    }

    function dragEnter(e) {
      this.className += ' hovered';
      e.preventDefault();
    }

    function dragLeave(e) {
      e.preventDefault();
      this.className = 'tableList';
    }

    function dragDrop(e) {
      e.preventDefault();
      let vegetable_id: number = parseInt(
        `${fillSelected.getAttribute('vegetable-id')}`
      );
      let table_position: number =
        parseInt(`${this.getAttribute('table-position')}`) - 1;

      if (this.childNodes.length > 0) {
        this.removeChild(this.childNodes[0]);
      }
      var $html = _window.$(fillSelected);
      var temp = document.createElement('div');
      temp.innerHTML = $html.prop('outerHTML');
      this.appendChild(temp);
      that.setTableList(table_position, vegetable_id, temp);
      this.className = 'tableList';
    }
  };
}
