"""empty message

Revision ID: 2e997e321c11
Revises: a8c7f1d6e06c
Create Date: 2020-09-08 12:42:05.414156

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2e997e321c11'
down_revision = 'a8c7f1d6e06c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('campus', sa.ARRAY(sa.String()), server_default='{}', nullable=False))
    op.add_column('users', sa.Column('year', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'year')
    op.drop_column('users', 'campus')
    # ### end Alembic commands ###
