// import { Component, OnInit, HostListener } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Message } from '../model/Message.model';


// @Component({
//   selector: 'app-conversation-history',
//   templateUrl: './conversation-history.component.html',
//   styleUrls: ['./conversation-history.component.css']
// })
// export class ConversationHistoryComponent implements OnInit {
//   userId: string | undefined;
//   messages: Message[] = [];
//   before: string | null = null;
//   loading = false;

//   constructor(private route: ActivatedRoute, private userService: UserService) { }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       this.userId = params.get('userId');
//       this.getConversationHistory();
//     });
//   }

//   getConversationHistory(): void {
//     this.loading = true;
//     this.userService.getConversationHistory(this.userId, this.before).subscribe(
//       (response: { messages: Message[], before: string | null }) => {
//         this.messages.push(...response.messages);
//         this.before = response.before;
//         this.loading = false;
//       },
//       (error) => {
//         console.error('Error while fetching conversation history:', error);
//         this.loading = false;
//       }
//     );
//   }

//   @HostListener('window:scroll', [])
//   onScroll(): void {
//     if (!this.loading && this.shouldLoadMoreMessages()) {
//       this.getConversationHistory();
//     }
//   }

//   shouldLoadMoreMessages(): boolean {
//     const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
//     const body = document.body;
//     const html = document.documentElement;
//     const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
//     const windowBottom = windowHeight + window.pageYOffset;
//     return windowBottom >= docHeight - 100; // Load more messages when the user is 100px above the bottom of the page
//   }
// }
