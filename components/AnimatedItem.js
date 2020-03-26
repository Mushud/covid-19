import React, { Component } from 'react';
import { ViewPropTypes } from 'react-native';
import Lottie from 'lottie-react-native';
import PropTypes from 'prop-types';

class AnimatedItem extends Component {
    componentDidMount() {
        this.animation.play();
    }

    render() {
        const { animation, style, loop, speed = 1 } = this.props;
        return (
            <Lottie
                ref={(animationInstance) => {
                    this.animation = animationInstance;
                }}
                source={animation}
                style={{ ...style }}
                loop={loop}
                speed={speed}
            />
        );
    }
}

AnimatedItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    animation: PropTypes.object.isRequired,
    style: ViewPropTypes.style,
    loop: PropTypes.bool,
};

AnimatedItem.defaultProps = {
    style: { height: 100, width: 100 },
    loop: true,
};

export default AnimatedItem;
