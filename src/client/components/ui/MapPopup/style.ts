import styled, { css } from 'styled-components'
import { GithubIcon, MessageIcon, ArrowRightIcon } from '@components/icons'

export const MapPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .user {
    width: 100%;
    display: flex;
    justify-content: space-between;

    span {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      strong {
        font-size: 1.25rem;
        font-family: 'Nunito', 'Roboto', sans-serif;
        color: var(--title);
      }

      p {
        font-size: 1rem;
        color: var(--detail);
      }
    }

    button {
      background: var(--secondary);
      border-radius: 0 10px 10px 0;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  span {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0.8rem;
  }
`

const icon = css`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--title);
  flex-shrink: 0;
  transition: color 0.2s;

  &:hover {
    color: var(--secondary);
  }
`

export const GithubIconStyle = styled(GithubIcon)`
  ${icon}
`
export const MessageIconStyle = styled(MessageIcon)`
  ${icon}
`

export const ArrowRightIconStyle = styled(ArrowRightIcon)`
  width: 2rem;
  height: 2rem;
  color: #fff;
`
