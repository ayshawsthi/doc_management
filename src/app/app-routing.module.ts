import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'documents', loadChildren: () => import('./document/document.module').then(m => m.DocumentModule) },
  { path: 'ingestion', loadChildren: () => import('./ingestion/ingestion.module').then(m => m.IngestionModule) },
  { path: 'qna', loadChildren: () => import('./qn-a/qn-a.module').then(m => m.QnAModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
