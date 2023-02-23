import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  constructor(
    public loadingService: LoadingService,
    private changeDetector: ChangeDetectorRef
  ) {}

  @Input() type: 'spinner' | 'progress' = 'progress';

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }
}
