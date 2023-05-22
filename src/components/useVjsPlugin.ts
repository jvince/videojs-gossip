import { useMemo } from 'react';
import { VjsPluginLike } from '../types';
import { useVjsComponentBridge } from './VjsComponentBrigdeProvider';

function useVjsPlugin<T extends VjsPluginLike>(pluginName: string) {
  const { player } = useVjsComponentBridge();

  return useMemo(() => {
    if (player.usingPlugin(pluginName)) {
      return player[pluginName]() as T;
    }
    throw new Error(`Plugin ${pluginName} is not registered.`);
  }, [pluginName, player]);
}

export default useVjsPlugin;
