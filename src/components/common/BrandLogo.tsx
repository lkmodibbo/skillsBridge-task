import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logoImg from '@/assets/images/Logo.png'

// ─── Styled components ───────────────────────────────────────────────────────

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  flex-shrink: 0;
`

const LogoImage = styled.img`
  width: auto;
  object-fit: contain;
`

const BrandName = styled.span`
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.01em;
`

const Skills = styled.span`
  color: #4f46e5;
`

const Bridge = styled.span`
  color: #facc15;
`

// ─── Props ───────────────────────────────────────────────────────────────────

interface BrandLogoProps {
  showImage?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const imgSizeMap = { sm: '26px', md: '32px', lg: '38px' }
const fontSizeMap = { sm: '13px', md: '15px', lg: '17px' }

// ─── Component ───────────────────────────────────────────────────────────────

export const BrandLogo = ({ showImage = true, size = 'md' }: BrandLogoProps) => (
  <LogoLink to="/">
    {showImage && (
      <LogoImage src={logoImg} alt="SkillBridge logo" style={{ height: imgSizeMap[size] }} />
    )}
    <BrandName style={{ fontSize: fontSizeMap[size] }}>
      <Skills>Skills</Skills>
      <Bridge>Bridge</Bridge>
    </BrandName>
  </LogoLink>
)
