import styled from 'styled-components'

export const LogoContainer = styled.div<{ titleColor?: string }>`
  width: min-content;
  height: min-content;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > h1 {
    font-family: 'Nunito', 'Roboto', sans-serif;
    font-size: 2.25rem;
    line-height: 42px;
    color: ${({ titleColor, ...props }) => props.theme.colors[titleColor]};

    @media (min-width: 600px) {
      font-size: 3rem;
      line-height: 65px;
    }
  }
`

export const LogoSVG = styled.svg<{ SVGfill: string }>`
  width: 4.18rem;
  height: 4.18rem;

  path {
    fill: ${({ SVGfill, ...props }) => props.theme.colors[SVGfill]};
  }

  @media (min-width: 550px) {
    width: 5.43rem;
    height: 5.43rem;
  }
`
