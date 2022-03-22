class Api::CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy, :users]
  
  def index
    render json: Course.all
  end

  def show
    render json: @course
  end

  def users 
    render json: @course.users
  end

  def create
    @course = Course.new(course_params)
    if @course.save 
      render json: @course
    else
      render json: { errors: @course.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @course.update(course_params) 
      render json: @course
    else
      render json: { errors: @course.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @course.destroy
    render json: { message: 'Course deleted' }
  end

  private 
    def course_params
      params.require(:course).permit(:title, :desc, :subject)
    end

    def set_course
      @course = Course.find(params[:id])
    end

end
