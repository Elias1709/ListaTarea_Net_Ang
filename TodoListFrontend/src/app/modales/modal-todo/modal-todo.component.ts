
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoItem } from 'src/app/interfaces/todo-item';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-modal-todo',
  templateUrl: './modal-todo.component.html',
  styleUrls: ['./modal-todo.component.css']
})
export class ModalTodoComponent implements OnInit {

  formTodo: FormGroup;
  titulo: string = "Agregar";
  nombreBoton: string = "Guardar";

  constructor(
  private modal: MatDialogRef<ModalTodoComponent>,
  @Inject(MAT_DIALOG_DATA) public datosTodo: any,
  private fb: FormBuilder,
  private todoService: TodoService
) {
  this.formTodo = this.fb.group({
    title: [{value: '', disabled: datosTodo?.modoDetalle}],
    description: [{value: '', disabled: datosTodo?.modoDetalle}],
    maxCompletionDate: [{value: '', disabled: datosTodo?.modoDetalle}],
    isCompleted: [{value: false, disabled: datosTodo?.modoDetalle}]
  });

  if (datosTodo?.modoDetalle) {
    this.titulo = "Detalle";
    this.nombreBoton = "";
  } else if (this.datosTodo != null) {
    this.titulo = "Editar";
    this.nombreBoton = "Actualizar";
  }
}

  ngOnInit(): void {
    if (this.datosTodo != null) {
      this.formTodo.patchValue({
        title: this.datosTodo.title,
        description: this.datosTodo.description,
        maxCompletionDate: this.datosTodo.maxCompletionDate,
        isCompleted: this.datosTodo.isCompleted
      });
    }
  }

  crearModificarTodo() {
    const fecha = this.formTodo.value.maxCompletionDate;
    const fechaISO = new Date(fecha).toISOString();

    if (this.datosTodo == null) {
      const todo: Omit<TodoItem, 'createdAt'> = {
        id: 0,
        title: this.formTodo.value.title,
        description: this.formTodo.value.description,
        maxCompletionDate: fechaISO,
        isCompleted: this.formTodo.value.isCompleted
      };

      this.todoService.createTodo(todo as TodoItem).subscribe({
        next: (data) => {
          this.modal.close(data);
        },
        error: (e) => {
          console.error("Error al crear tarea", e.error.errors);
        }
      });
    } else {
      const todo: TodoItem = {
        id: this.datosTodo.id,
        title: this.formTodo.value.title,
        description: this.formTodo.value.description,
        maxCompletionDate: fechaISO,
        isCompleted: this.formTodo.value.isCompleted,
        createdAt: this.datosTodo.createdAt
      };

      this.todoService.updateTodo(todo.id, todo).subscribe({
        next: () => {
          this.modal.close(todo);
        },
        error: (e) => {
          console.error("Error al actualizar tarea", e.error.errors);
        }
      });
    }
  }
  
  
}