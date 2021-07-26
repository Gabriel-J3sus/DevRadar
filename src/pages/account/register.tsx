import React, { FormEvent, useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Container } from '@styles/pages/register'
import { Logo } from '@components/Logo'
import Link from 'next/link'
import FormInput from '@components/FormInput'
import { useAuth } from 'src/hooks/useAuth'

const Register: React.FC = ({ children }) => {
  const { register } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [githubURL, setGithubURL] = useState('')
  const [latitude, setLatitude] = useState<string | number>(0)
  const [longitude, setLongitude] = useState<string | number>(0)
  const [password, setPassword] = useState('')

  const coordenates: [number, number] = useMemo(() => {
    console.log('ddddd')
    return [Number(latitude), Number(longitude)]
  }, [latitude, longitude])

  const MapWithoutSSR = dynamic(() => import('@components/Map'), { ssr: false })

  async function handleSubmit() {
    await register({
      name,
      email,
      technologies,
      githubURL,
      latitude: Number(latitude),
      longitude: Number(longitude),
      password
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords

        setLatitude(latitude)
        setLongitude(longitude)
      },
      err => {
        console.log(err)
      },
      {
        timeout: 30000
      }
    )
  }, [])

  return (
    <Container>
      <div className="wrapper">
        <main>
          <span>
            <Logo SVGfill="logo" title="DevFinder" />

            <p>Crie uma conta e encontre parceiros, em um só lugar.</p>
          </span>
          <Stepper submitFunction={() => handleSubmit()}>
            <div className="step-container">
              <FormInput
                label="Nome"
                inputType="text"
                value={name}
                onChange={event => setName(event.target.value)}
              />
              <FormInput
                label="Email"
                inputType="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>

            <div className="step-container">
              <FormInput
                label="Tecnologias"
                inputType="text"
                value={technologies}
                onChange={event => setTechnologies(event.target.value)}
              />
              <FormInput
                label="Link do Github"
                inputType="text"
                value={githubURL}
                onChange={event => setGithubURL(event.target.value)}
              />
            </div>

            <div className="step-container local-inputs">
              <div className="input-wrapper">
                <FormInput
                  label="Latitude"
                  inputType="text"
                  value={latitude}
                  onChange={event => setLatitude(event.target.value)}
                />

                <FormInput
                  label="Longitude"
                  inputType="text"
                  value={longitude}
                  onChange={event => setLongitude(event.target.value)}
                />
              </div>

              <p>Clique no mapa ou permita acesso a sua localização.</p>
            </div>
            <div className="step-container">
              <FormInput
                label="Senha"
                inputType="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
          </Stepper>
        </main>

        <aside>
          <MapWithoutSSR coordinates={coordenates} />
        </aside>
      </div>
    </Container>
  )
}

export default Register

interface StepperProps {
  submitFunction(): void
}

const Stepper: React.FC<StepperProps> = ({ children, submitFunction }) => {
  const [step, setStep] = useState(0)
  const childrenArray = React.Children.toArray(children)
  const currentChild = childrenArray[step]

  function isLastStep() {
    return step === childrenArray.length - 1
  }

  return (
    <form
      onSubmit={(event: FormEvent) => {
        event.preventDefault()

        if (isLastStep()) {
          submitFunction()
        } else {
          setStep(st => st + 1)
        }
      }}
    >
      <h2>Cadastrar</h2>

      {currentChild}

      <div className="controlls">
        {step > 0 ? (
          <button
            type="button"
            className="back"
            onClick={() => setStep(st => st - 1)}
          >
            Voltar
          </button>
        ) : null}

        <button type="submit" className="submit">
          {isLastStep() ? 'Cadastrar' : 'Avançar'}
        </button>
      </div>

      <p className="link">
        Deseja criar uma conta?{' '}
        <Link href="signin">
          <a>Clique aqui</a>
        </Link>
      </p>
    </form>
  )
}
