import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnChanges{
  
  @Input({required: true}) bannerTitle: string = '';
  @Input() bannerOverview: string = '';
  @Input() key = 'djSKp_pwmOA';

  private sanitizer = inject(DomSanitizer);
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`)
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['key']){
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`)
    }
  }
}
