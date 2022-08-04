import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

   componentDidMount = async () => {
     const data = await getUser();
     const { name, email, description, image } = data;
     this.setState({
       name,
       email,
       description,
       image,
       loading: false,
       disabled: true,
     });
   }

   inputChangeEdit = ({ target }) => {
     const { name, value } = target;
     this.setState({
       [name]: value,
     }, () => this.disableSubmit());
   }

   disableSubmit = () => {
     const { name, email, description, image } = this.state;
     if (name.length > 0 && email.length > 0
       && description.length > 0 && image.length > 0) {
       this.setState({ disabled: false });
     }
   }

   functionSubmit = async () => {
     this.setState({ loading: true });
     const { name, email, description, image } = this.state;
     await updateUser({ name, email, description, image });
     this.setState({
       loading: false,
     });
     const { history } = this.props;
     history.push('/profile');
   };

   render() {
     const { loading, name, email, description, image, disabled } = this.state;
     console.log(this.state);
     return (
       <div data-testid="page-profile-edit">
         <Header />
         {loading
           ? <span>Carregando...</span>
           : (
             <form>

               <label htmlFor="name">
                 Nome:
                 <input
                   type="text"
                   name="name"
                   data-testid="edit-input-name"
                   value={ name }
                   onChange={ this.inputChangeEdit }
                 />

               </label>

               <label htmlFor="email">
                 E-mail:
                 <input
                   type="email"
                   name="email"
                   data-testid="edit-input-email"
                   value={ email }
                   onChange={ this.inputChangeEdit }
                 />
               </label>

               <label htmlFor="description">
                 Descrição:
                 <input
                   type="text"
                   name="description"
                   data-testid="edit-input-description"
                   value={ description }
                   onChange={ this.inputChangeEdit }
                 />
               </label>

               <label htmlFor="image">
                 Imagem de perfil:
                 <input
                   type="text"
                   name="image"
                   data-testid="edit-input-image"
                   value={ image }
                   onChange={ this.inputChangeEdit }
                 />
               </label>

               <button
                 data-testid="edit-button-save"
                 type="submit"
                 disabled={ disabled }
                 onClick={ this.functionSubmit }
                 value={ image }
               >
                 Editar perfil

               </button>

             </form>
           )}
       </div>
     );
   }
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default ProfileEdit;
