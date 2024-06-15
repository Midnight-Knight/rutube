import Style from './aside.module.scss';
import AsideColumn from '@/components/aside/asideColumn';
import AsideLinkPage from '@/components/buttons/asideLinkPage';
import AppPageSvg from '@/public/dashboard-square-01.svg';
import AddBaseSvg from '@/public/database-add.svg';
import VideoSvg from '@/public/play-list.svg';

export default function Aside() {
  return (
    <aside className={Style.Aside}>
      <AsideColumn>
        <AsideLinkPage link={'/'} text={'Главная'} svg={AppPageSvg} />
        <AsideLinkPage link={'/video_add'} text={'Видео пополнение базы'} svg={AddBaseSvg} />
        <AsideLinkPage link={'/video_moderation'} text={'Видео модерация'} svg={VideoSvg} />
      </AsideColumn>
      <h6>Команда: RealityFirst</h6>
    </aside>
  );
}

/*
<AsideLinkPage link={'/audio_add'} text={'Аудио пополнение базы'} svg={AddBaseSvg}/>
                <AsideLinkPage link={'/audio_moderation'} text={'Аудио модерация'} svg={AudioSvg}/>
 */
