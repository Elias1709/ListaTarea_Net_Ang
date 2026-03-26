import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';
import { TodoItem } from 'src/app/interfaces/todo-item';
import { MatDialog } from '@angular/material/dialog';
import { ModalTodoComponent } from '../../modales/modal-todo/modal-todo.component';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{
  displayedColumns: string[]=[
    'title',
    'description',
    'maxCompletionDate',
    'isCompleted',
    'createdAt',
    'acciones'
  ];
 
  todos: TodoItem[] = [];
  dataSource = new MatTableDataSource<TodoItem>();
  todoForm!: FormGroup;


  constructor(private todoService: TodoService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.todoService.getTodos().subscribe(data => {
      this.dataSource.data = data; 
    });
  }

  createTodo(): void {
  const dialogRef = this.dialog.open(ModalTodoComponent, {
    width: '500px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.dataSource.data = [...this.dataSource.data, result];
    }
  });
}


getTodo(id: number): void {
  this.todoService.getTodoById(id).subscribe({
    next: (data) => {
      this.dialog.open(ModalTodoComponent, {
        width: '500px',
        disableClose: true,
        data: { ...data, modoDetalle: true } 
      });
    },
    error: (e) => {
      console.error("Error al obtener tarea", e.error);
    }
  });
}

updateTodo(element: TodoItem): void {
  const dialogRef = this.dialog.open(ModalTodoComponent, {
    width: '500px',
    disableClose: true,
    data: element
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.dataSource.data = this.dataSource.data.map(t =>
        t.id === result.id ? result : t
      );
    }
  });
}

  deleteTodo(id: number): void {
  this.todoService.deleteTodo(id).subscribe({
    next: () => {
      this.dataSource.data = this.dataSource.data.filter(t => t.id !== id);
      console.log(`Tarea con id ${id} eliminada correctamente`);
    },
    error: (e) => {
      console.error("Error al eliminar tarea", e.error);
    }
  });
}

}
