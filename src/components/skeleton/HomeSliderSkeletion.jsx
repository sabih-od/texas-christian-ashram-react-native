import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { width } from "../../theme";

const HomeSliderSkeleton = () => {
    return (
        <SkeletonPlaceholder borderRadius={4} marginBottom={10}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent="space-between">
                <SkeletonPlaceholder.Item width={width - 20} height={250} borderRadius={10} />
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    );
}

export default HomeSliderSkeleton;