import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      infoUser: [],
      loading: true,
    };
  }

   componentDidMount = async () => {
     const data = await getUser();
     this.setState({
       infoUser: data,
       loading: false,
     });
     console.log(data);
   }

   render() {
     const { loading, infoUser } = this.state;
     return (
       <div data-testid="page-profile">
         <Header />
         {loading
           ? <span>Carregando...</span>
           : (
             <div>
               <img
                 src={ infoUser.image }
                 alt={ `Foto de ${infoUser.name}` }
                 data-testid="profile-image"
               />
               Nome:
               <p>{infoUser.name}</p>
               Email:
               <p>{infoUser.email}</p>
               Descrição:
               <p>{infoUser.description}</p>
               <Link to="/profile/edit">Editar perfil</Link>
             </div>
           )}
       </div>
     );
   }
}

export default Profile;
