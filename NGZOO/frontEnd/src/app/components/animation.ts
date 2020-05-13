import { animate, style, transition, trigger } from '@angular/animations';

export const FadeIn =
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-30%)'
        }),
        animate('300ms linear',
        style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ]);
