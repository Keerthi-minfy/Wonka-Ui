import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}

export function Modal({ isOpen, onClose, title, children, footer, width = '500px' }: ModalProps) {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={onClose}
      >
        {/* Modal Container */}
        <div
          style={{
            width: width,
            maxWidth: '90vw',
            maxHeight: '90vh',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 24px',
              borderBottom: '1px solid #e5e7eb'
            }}
          >
            <h2 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827'
            }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <X style={{ width: '20px', height: '20px', color: '#6b7280' }} />
            </button>
          </div>

          {/* Body Content */}
          <div
            style={{
              padding: '24px',
              overflowY: 'auto',
              flex: 1
            }}
          >
            {children}
          </div>

          {/* Actions Bar (Footer) */}
          {footer && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '12px',
                padding: '16px 24px',
                borderTop: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb'
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Button components for modal actions
interface ModalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export function ModalButton({ children, onClick, variant = 'secondary', disabled = false }: ModalButtonProps) {
  const baseStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    transition: 'all 0.2s',
    opacity: disabled ? 0.5 : 1
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      ...baseStyle,
      backgroundColor: '#6366f1',
      color: '#ffffff'
    },
    secondary: {
      ...baseStyle,
      backgroundColor: '#ffffff',
      color: '#374151',
      border: '1px solid #d1d5db'
    },
    danger: {
      ...baseStyle,
      backgroundColor: '#ef4444',
      color: '#ffffff'
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={variants[variant]}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (variant === 'primary') e.currentTarget.style.backgroundColor = '#4f46e5';
          else if (variant === 'secondary') e.currentTarget.style.backgroundColor = '#f3f4f6';
          else if (variant === 'danger') e.currentTarget.style.backgroundColor = '#dc2626';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') e.currentTarget.style.backgroundColor = '#6366f1';
        else if (variant === 'secondary') e.currentTarget.style.backgroundColor = '#ffffff';
        else if (variant === 'danger') e.currentTarget.style.backgroundColor = '#ef4444';
      }}
    >
      {children}
    </button>
  );
}
