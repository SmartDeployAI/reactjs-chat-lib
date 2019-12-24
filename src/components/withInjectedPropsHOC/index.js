import React from 'react';

export function withInjectedProps(WrappedComponent, injectedProps) {
  class WithInjectedProps extends React.PureComponent {
    render() {
      let { forwardedRef, ...rest } = this.props;
      return (
        <WrappedComponent ref={forwardedRef} {...rest} {...injectedProps} />
      );
    }
  }

  function forwardRef(props, ref) {
    return <WithInjectedProps {...props} forwardedRef={ref} />;
  }

  forwardRef.displayName = `WithInjectedProps(${getDisplayName(
    WrappedComponent,
  )})`;
  return React.forwardRef(forwardRef);
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
