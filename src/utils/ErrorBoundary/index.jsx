import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    text-align: center;
`;

const Reload = styled.span`
    cursor: pointer;
    color: #0077FF;
`;

export default class ErrorBoundary extends Component {
    state = {
        error: '',
        hasError: false,
    };
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        // eslint-disable-next-line no-console
        console.log({ error, errorInfo });
    }

    render() {
        const { hasError } = this.state;

        if (hasError) {
            return (
                <Wrapper>
                    <div>
                        <h1>Something went wrong.</h1>
                        <h4>Please contact the admin</h4>
                        <p>
                            <Reload
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                Reload this page
                            </Reload>{' '}
                        </p>
                    </div>
                </Wrapper>
            );
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
