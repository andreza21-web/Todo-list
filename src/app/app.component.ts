import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;

  /**
   *
   * @param fb validar formulario
   */

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });
    this.load();
  }

/**
 * adicionar item
 */
  add(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length +1;
    this.todos.push(new Todo(id, title,false));
    this.save();
    this.clear();
  }

/**
 *limpar tarefa
 */
  clear(){
    this.form.reset();
  }

/**
 *
 * @param todo remover item na lista
 *
 */
  remove(todo: Todo){
    const index =this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index,1);
    }
      this.save();
  }
  /**
   *
   * @param todo markAsDone marcar como comcluido
   */

  markAsDone(todo: Todo){
    todo.done = true;
      this.save();
  }

  /**
   *
   * @param todo markAsUndone marcar como não concluido
   */
  markAsUndone(todo: Todo){
    todo.done = false;
      this.save();
  }

  /**
   *
   * save -> salvar informações no JSON
   */
  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  /**
   * salvar informaçoes  no brawser  json
   */
  load(){
    const data = localStorage.getItem('todos');
    if(data){
    this.todos = JSON.parse(data);
    }else{
      this.todos = [];
    }
  }
  changeMode(mode: string){
    this.mode = mode;
  }
}
