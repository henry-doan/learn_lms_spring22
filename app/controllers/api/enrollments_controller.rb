class Api::EnrollmentsController < ApplicationController
  before_action :set_course
  before_action :set_enrollment, only: [:show, :update, :destroy]

  def index
    @teachers = @course.enrollments.where(role: 'teacher')
    @tas = @course.enrollments.where(role: 'ta')
    @students = @course.enrollments.where(role: 'student')
    render json: { teachers: @teachers, tas: @tas, students: @students }
  end

  def show
    render json: @enrollment
  end

  def unenrolledUsers
    @users = User.all - @course.users 
    render json: @users 
  end

  def enrolledUsers
    render json: @course.users 
  end

  def create
    @enrollment = @course.enrollments.new(enrollment_params)
    if @enrollment.save
      render json: @enrollment
    else
      render json: { errors: @enrollment.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @enrollment.update(enrollment_params)
      render json: @enrollment
    else
      render json: { errors: @enrollment.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @enrollment.destroy
    render json: { message: 'Unenrolled'}
  end

  private 
    def enrollment_params
      params.require(:enrollment).permit(:role, :user_id)
    end

    def set_course
      @course = Course.find(params[:course_id])
    end

    def set_enrollment
      @enrollment = @course.enrollments.find(params[:id])
    end
end
