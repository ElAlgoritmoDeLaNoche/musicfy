import React, { useState } from 'react'
import { Button, Icon, Form, Input } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { validateEmail } from '../../../utils/Validations'
import firebase from '../../../utils/Firebase'
import 'firebase/compat/auth'
import './RegisterForm.scss'

function defaultValueForm() {
  return {
    email: "",
    password: "",
    username: "",
  }
}

function RegisterForm(props) {

  const { setSelectedForm } = props;
  const [formData, setFormData] = useState(defaultValueForm())
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onsubmit = async () => {

    setFormError({})
    let errors = {}
    let formOk = true

    if (!validateEmail(formData.email)) {
      errors.email = true
      formOk = false
    }

    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }

    if (!formData.username) {
      errors.username = true
      formOk = false
    }

    setFormError(errors)

    if (formOk) {
      setIsLoading(true)
      await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(() => {
        changeUserName()
        sendVerificationEmail()
      }).catch(() => {
        toast.error("Error al crear la cuenta.", { theme: "colored" })
      }).finally(() => {
        setIsLoading(false)
        setSelectedForm(null)
      })
    }
  }

  const changeUserName = () => {
    firebase.auth().currentUser.updateProfile({
      displayName: formData.username
    }).catch(() => {
      toast.error("Error al asignar el nombre de usuario.", { theme: "colored" })
    })
  }

  const sendVerificationEmail = () => {
    firebase.auth().currentUser.sendEmailVerification().then(() => {
      toast.success("Se ha enviado el email de verificación.", { theme: "colored" })
    }).catch(() => {
      toast.error("Error al enviar el email de verificación.", { theme: "colored" })
    })
  }

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis.</h1>
      <Form onSubmit={onsubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electrónico"
            icon="envelope outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, introduce un correo electronico válido.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            icon={
              showPassword ? (
                <Icon name="eye slash outline" link onClick={handleShowPassword} />
              ) :
                <Icon name="eye" link onClick={handleShowPassword} />
            }
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">
              Por favor, elige una contraseña superior a 6 caracteres.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="¿Como deberiamos llamarte?"
            icon="user circle outline"
            error={formError.username}
          />
          {formError.username && (
            <span className="error-text">Por favor, introduce un nombre.</span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>Continuar</Button>
      </Form>
      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          ¿Ya tienes cuenta?
          {" "}
          <span onClick={() => setSelectedForm("login")}>Inicia Sesión</span>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm