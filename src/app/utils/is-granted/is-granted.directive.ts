import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../../types/user';
import { RbacService } from '../../services/rbac.service';

// @Directive({
//   selector: '[isGranted]',
//   standalone: true
// })
// export class IsGrantedDirective implements OnInit {

//   private _rbacService = inject(RbacService);
//   private _templateRef = inject(TemplateRef);
//   private _viewContainer = inject(ViewContainerRef);
//   private _user!: User;
//   private _roleOrPermission!: string;

//   // TODO: Skipped for migration because:
//   //  Accessor inputs cannot be migrated as they are too complex.
//   @Input()
//   set isGranted(roleOrPermission: string) {
//     this._roleOrPermission = roleOrPermission;
//   }

//   // TODO: Skipped for migration because:
//   //  Accessor inputs cannot be migrated as they are too complex.
//   @Input('isGrantedFor')
//   set isGrantedFor(user: User) {
//     this._user = user;
//   };

//   ngOnInit() {
//     if (this._rbacService.isGranted(this._roleOrPermission, this._user)) {
//       this._viewContainer.clear();
//       this._viewContainer.createEmbeddedView(this._templateRef);
//     }
//   }

// }
