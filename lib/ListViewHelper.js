/**
 * Created by viktor.schneider on 07/12/2016.
 */

import {
    Animated,
    ListView
} from 'react-native';

class ListViewHelper {

    /**
     * Fix for scrolling issue with ListView which cause the list to render its items when interacted with only
     *
     * @param listViewRef reference to the ListView
     * @param {Number} [bounceValue=1.5] - intensity of the animation
     * @param {Number} [scrollingOffset=10]
     * @param {Number} [animationForwardScrollDelay=300]
     * @param {Number} [animationBackwardScrollDelay=100]
     */
    listViewScrollingIssueWorkaround(listViewRef, bounceValue, scrollingOffset, animationForwardScrollDelay,
                                     animationBackwardScrollDelay) {
        let defaultOptions = {
            bounceValue                 : 1.5,
            scrollingOffset             : 10,
            animationForwardScrollDelay : 300,
            animationBackwardScrollDelay: 100
        };

        let animatedValue = new Animated.Value(0.2);

        const animateList = () => {
            animatedValue.setValue(bounceValue ? bounceValue : defaultOptions.bounceValue);
            Animated.spring(animatedValue, {toValue: 1, friction: 5}).start();
        };

        //NOTE: might want to increase y a bit if 1 pt isn't enough
        setTimeout(() => {
            if (listViewRef) {
                let spotsListView = listViewRef;
                spotsListView.scrollTo({y: scrollingOffset ? scrollingOffset : defaultOptions.scrollingOffset});
                setTimeout(() => {
                    spotsListView.scrollTo({y: 0});
                }, animationBackwardScrollDelay ? animationBackwardScrollDelay : defaultOptions.animationBackwardScrollDelay);
            }
            animateList();
        }, animationForwardScrollDelay ? animationForwardScrollDelay : defaultOptions.animationForwardScrollDelay);
    }
}

export default new ListViewHelper();
