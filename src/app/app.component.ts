import { Component } from '@angular/core';
import { RestService } from './services/rest/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'search';

  searchValue: string;
  results = [];
  selectedIndex: number;

  constructor(private rest: RestService) { }

  cleanInput() {
    this.searchValue = '';
  }

  searchData(letter) {
    let searchResult = [];
    this.results = [];
    letter = letter.toLowerCase();

    letter = letter.trim();

    //not make requst if input is empty
    if (letter.length > 0) {

      //search by data headers
      this.rest.getData(letter).subscribe((data) => {
        data[0].forEach(element => {
          searchResult.push(element.header)
        });
        searchResult.sort();

        this.results = searchResult.map(item => {
          let newItem = item;

          let letterLength = letter.length;
          newItem = newItem.slice(0, letterLength);

          //compare input value with response  letters for making bold 
          if (newItem == letter) {
            return this.markBoldAndNormalLetters(item, 0, letterLength)
          }
          return { bold: "", normal: item }
        })
      });
    }
  }

  // streamline bold and normal letters of response string
  markBoldAndNormalLetters(item, start, end) {
    let letter = item.slice(start, end);
    let bold = letter;
    let normal = item.slice(end, length - 1)

    return { bold, normal }
  }

  chooseItem(header) {
    this.searchValue = header.bold + header.normal;
  }

  // change slected item with down and up keys
  keyPressOption(event) {
    let i: number = 0;

    i = this.results.map(v => v.bold + v.normal == this.searchValue).indexOf(true);

    if (event.keyCode === 40) {
      i++;
      this.selectedIndex = i;
      if (i < this.results.length) {
        this.searchValue = this.results[i].bold + this.results[i].normal;
      } else {
        this.searchValue = this.results[0].bold + this.results[0].normal;
        i = 0;
      }
    }
    else if (event.keyCode === 38) {
      i--;
      this.selectedIndex = i
      if (i < this.results.length) {
        if (i < 0) {
          i = this.results.length - 1;
          this.selectedIndex = i
        }
        this.searchValue = this.results[i].bold + this.results[i].normal;
      } else {
        this.searchValue = this.results[length - 1].bold + this.results[length - 1].normal;
        i = this.results.length - 1;
      }
    }
  }
}
