'use client'

import { motion } from 'motion/react'
import PropTypes from 'prop-types'

import Container from '@/components/ui/container'

import { cn } from '@/lib/utils'
import { EASE } from '@/constants/motion'

/**
 * PageHero — the dark navy hero block used at the top of every internal page.
 * Visually consistent with the homepage hero (mesh grid, gold + green halos,
 * gold hairline at bottom) but lighter on motion since inner pages should
 * feel structured, not theatrical.
 */
const PageHero = ({ eyebrow, title, lead, align = 'left', children, className = '' }) => {
  const isCenter = align === 'center'

  return (
    <section
      className={cn(
        'bg-navy-900 pb-section relative overflow-hidden pt-32 sm:pt-36 lg:pt-40',
        className,
      )}
    >
      {/* Mesh-grid pattern */}
      <div
        className="bg-mesh-grid bg-grid-32 pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 -right-32 h-[560px] w-[560px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(194,138,32,0.16) 0%, rgba(194,138,32,0) 60%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 h-[480px] w-[480px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(46,125,63,0.18) 0%, rgba(46,125,63,0) 60%)',
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        <div className={cn('max-w-3xl', isCenter && 'mx-auto text-center')}>
          {eyebrow ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE.outSoft }}
              className={cn(
                'border-gold-400 inline-flex items-center gap-3 border-l-2 pl-4',
                isCenter && 'border-b-0 border-l-0 pl-0',
              )}
            >
              <span className="text-gold-400 font-mono text-[11px] font-semibold tracking-[0.28em] uppercase">
                {eyebrow}
              </span>
            </motion.div>
          ) : null}

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: EASE.outSoft }}
            className="font-display text-cream-50 mt-6 text-[40px] leading-[1.05] font-semibold tracking-[-0.025em] text-balance sm:text-[52px] lg:text-[64px]"
          >
            {title}
          </motion.h1>

          {lead ? (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.22, ease: EASE.outSoft }}
              className={cn(
                'text-cream-100/80 mt-7 text-base leading-[1.7] sm:text-xl',
                isCenter && 'mx-auto',
              )}
            >
              {lead}
            </motion.p>
          ) : null}

          {children ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.34, ease: EASE.outSoft }}
              className={cn('mt-10', isCenter && 'flex justify-center')}
            >
              {children}
            </motion.div>
          ) : null}
        </div>
      </Container>

      {/* Bottom hairline */}
      <div className="via-gold-400/60 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent" />
    </section>
  )
}

PageHero.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.node.isRequired,
  lead: PropTypes.node,
  align: PropTypes.oneOf(['left', 'center']),
  children: PropTypes.node,
  className: PropTypes.string,
}

export default PageHero
