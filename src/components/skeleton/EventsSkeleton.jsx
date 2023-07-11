import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { width } from "../../theme";

const EventsSkeleton = () => {
    return (
        <SkeletonPlaceholder borderRadius={4} marginBottom={10}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent="space-between">
                <SkeletonPlaceholder.Item>
                    {/* <SkeletonPlaceholder.Item marginRight={10}> */}
                    <SkeletonPlaceholder.Item width={(width / 2) - 20} height={130} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={(width / 2) - 20} height={20} marginTop={10} />
                    <SkeletonPlaceholder.Item width={(width / 2) - 20} height={10} marginTop={5} />
                </SkeletonPlaceholder.Item>
                {/* <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item width={(width / 2) - 20} height={130} borderRadius={10} />
                    <SkeletonPlaceholder.Item width={(width / 2) - 20} height={20} marginTop={10} />
                    <SkeletonPlaceholder.Item width={(width / 2) - 20} height={10} marginTop={5} />
                </SkeletonPlaceholder.Item> */}
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    );
}

export default EventsSkeleton;