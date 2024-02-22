import { AddDiscussionInterface } from '../../types/discussion';
import { DiscussionRepoMongoDbInterface } from '../../frameworks/database/mongodb/repositories/discussionsRepoMongoDb';

export const discussionDbRepository = (repository: ReturnType<DiscussionRepoMongoDbInterface>) => {
    const addDiscussion = async (discussionInfo: AddDiscussionInterface) =>
        await repository.addDiscussion(discussionInfo);

    const getDiscussionByLesson = async (lessonId: string) => await repository.getDiscussionsByLesson(lessonId);

    const editDiscussion = async (id: string, message: string) => await repository.editDiscussion(id, message);

    const deleteDiscussionById = async (id: string) => await repository.deleteDiscussionById(id);

    const replyDiscussion = async (id: string, reply: { studentId: string; message: string }) =>
        await repository.replyDiscussion(id, reply);

    const getRepliesByDiscussionId = async (id: string) => await repository.getRepliesByDiscussionId(id);

    return {
        addDiscussion,
        getDiscussionByLesson,
        editDiscussion,
        deleteDiscussionById,
        replyDiscussion,
        getRepliesByDiscussionId,
    };
};

export type DiscussionDbInterface = typeof discussionDbRepository;
