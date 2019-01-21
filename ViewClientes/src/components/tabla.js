import React, { Component } from 'react';
import axios from 'axios';
import {Table,Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {FormGroup,Input,Label} from 'reactstrap';
import  './tabla.css';


class Tabla extends Component{
  
        
        state = {
            clientes:[],
            newClienteModal:false,
            editClienteModal:false,
            datosNewCliente:{
                nombres:'',
                apellidos:''
            },
            datosEditCliente:{
                id:'',
                title:'',
                body:''
            }
        };
       
    
    
    componentWillMount(){
        axios.get('http://localhost:8080/cliente').then((response)=>
        {
            
            this.setState(
                {
                    
                    clientes: response.data
                    
                }
            )
        });
    }

    toggleNewCliente(){
            this.setState({
                newClienteModal:!this.state.newClienteModal
            });
    }

    toggleEditCliente(){
        this.setState({
            editClienteModal:!this.state.editClienteModal
        });
}

    addCliente(){
        axios.post('http://localhost:8080/cliente/create',this.state.datosNewCliente).then((res)=>{
            //console.log(res.data);
            let {clientes} = this.state;
            clientes.push(res.data);
            this.setState(
                {
                    clientes,
                    newClienteModal:false,
                    datosNewCliente:{
                        nombres:'',
                        apellidos:''
                    }
                });

        });
    }

    editCliente(id,title,body){
        this.setState(
            {
                datosEditCliente:{id,title,body},editClienteModal:!this.state.editClienteModal
            }
        );
        
    }
    updateCliente(){
        let {titulo,body} = this.state.datosEditCliente;
        axios.put('https://jsonplaceholder.typicode.com/posts/'+this.state.datosEditCliente.id,{
            titulo,body
        }).then((res)=>{
            console.log(res.data);
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=>
        {
            this.setState(
                {
                    clientes: response.data
                    
                }
            )
        });

        this.setState({
          editClienteModal:false,datosEditCliente:{id:'',title:'',cuerpo:''}
        })

      })
     }

     
    render(){
        let clientes = this.state.clientes.map((cliente)=>
        {
            return(
                <tr key= {cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nombres}</td>
                    <td>{cliente.apellidos}</td>
                    <td><Button color="success" size="sm" className="mr-2" onClick={this.editCliente.bind(this,cliente.id,cliente.title,cliente.body)}>Editar</Button></td>
                    <td><Button color="danger" size="sm">Eliminar</Button></td>
                </tr>
            )
        });
        return(
            <div className="container ">
                <h1 className="display-1 text-center">Lista de Clientes</h1>
                
                <Button  className="my-3" color="danger" onClick={this.toggleNewCliente.bind(this)}>Nuevo Cliente</Button>
                <Modal isOpen={this.state.newClienteModal} toggle={this.toggleNewCliente.bind(this)} >
                    <ModalHeader toggle={this.toggleNewCliente.bind(this)}>Ingreso de Clientes</ModalHeader>
                    <ModalBody>
                       <FormGroup>
                         <Label for="nombres">Nombre</Label>
                         <Input type="text" id="nombres" placeholder="Nombres" value={this.state.datosNewCliente.nombres} onChange={(e)=>{
                             let {datosNewCliente} = this.state;
                             datosNewCliente.nombres= e.target.value;
                             this.setState({datosNewCliente})
                             }} />
                        </FormGroup>
                        <FormGroup>
                         <Label for="body">Apellido</Label>
                         <Input type="text" id="apellidos" placeholder="Ingrese Apellido" value= {this.state.datosNewCliente.apellidos} onChange={(e)=>{
                             let {datosNewCliente} = this.state;
                             datosNewCliente.apellidos= e.target.value;
                             this.setState({datosNewCliente})
                             }} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addCliente.bind(this)}>Agregar</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewCliente.bind(this)}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
               
                <Modal isOpen={this.state.editClienteModal} toggle={this.toggleEditCliente.bind(this)} >
                    <ModalHeader toggle={this.toggleEditCliente.bind(this)}>Ingreso de Clientes</ModalHeader>
                    <ModalBody>
                       <FormGroup>
                         <Label for="titulo">Nombre</Label>
                         <Input type="text" id="titulo" placeholder="Ingrese Nombre" value={this.state.datosEditCliente.title} onChange={(e)=>{
                             let {datosEditCliente} = this.state;
                             datosEditCliente.title= e.target.value;
                             this.setState({datosEditCliente})
                             }} />
                        </FormGroup>
                        <FormGroup>
                         <Label for="body">Apellido</Label>
                         <Input type="text" id="body" placeholder="Ingrese Apellido" value= {this.state.datosEditCliente.body} onChange={(e)=>{
                             let {datosEditCliente} = this.state;
                             datosEditCliente.body= e.target.value;
                             this.setState({datosEditCliente})
                             }} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateCliente.bind(this)}>Agregar</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditCliente.bind(this)}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
                <Table dark>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes}
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default Tabla;
